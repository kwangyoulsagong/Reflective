// service/notificationService.ts
import { Response } from "express";
import Notification, { INotification } from "../model/notificationModel";

interface NotificationData {
  type: "LIKE" | "COMMENT" | "FOLLOW";
  senderId: string;
  receiverId: string;
  postId?: string;
  commentId?: string;
  content?: string;
}

class NotificationService {
  private clients: Map<string, Response> = new Map();

  // 클라이언트 연결 등록
  public addClient(userId: string, res: Response): void {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });

    this.clients.set(userId, res);
  }

  // 클라이언트 연결 해제
  public removeClient(userId: string): void {
    this.clients.delete(userId);
  }

  // 알림 전송 및 저장
  public async sendNotification(
    data: NotificationData
  ): Promise<INotification> {
    // DB에 알림 저장
    const notification = await this.saveNotificationToDB(data);

    // 실시간 알림 전송
    const client = this.clients.get(data.receiverId);
    if (client) {
      const eventData = JSON.stringify(notification);
      client.write(`data: ${eventData}\n\n`);
    }

    return notification;
  }

  // DB에 알림 저장
  private async saveNotificationToDB(
    data: NotificationData
  ): Promise<INotification> {
    const notification = new Notification({
      type: data.type,
      sender: data.senderId,
      receiver: data.receiverId,
      post: data.postId,
      comment: data.commentId,
      content: data.content,
    });

    return await notification.save();
  }

  // 사용자의 읽지 않은 알림 개수 조회
  public async getUnreadCount(userId: string): Promise<number> {
    return await Notification.countDocuments({
      receiver: userId,
      isRead: false,
    });
  }

  // 사용자의 알림 목록 조회
  public async getNotifications(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<INotification[]> {
    return await Notification.find({ receiver: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("sender", "username profileImage")
      .populate("post", "title")
      .exec();
  }

  // 알림 읽음 처리
  public async markAsRead(
    notificationId: string,
    userId: string
  ): Promise<INotification | null> {
    return await Notification.findOneAndUpdate(
      { _id: notificationId, receiver: userId },
      { isRead: true },
      { new: true }
    );
  }

  // 모든 알림 읽음 처리
  public async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany(
      { receiver: userId, isRead: false },
      { isRead: true }
    );
  }

  // 알림 삭제
  public async deleteNotification(
    notificationId: string,
    userId: string
  ): Promise<boolean> {
    const result = await Notification.deleteOne({
      _id: notificationId,
      receiver: userId,
    });
    return result.deletedCount > 0;
  }

  // 오래된 알림 정리 (예: 30일 이상 된 알림)
  public async cleanOldNotifications(days: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    await Notification.deleteMany({
      createdAt: { $lt: cutoffDate },
    });
  }
}

export default new NotificationService();
