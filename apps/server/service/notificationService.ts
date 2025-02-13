import { Response } from "express";
import Notification, { INotification } from "../model/notificationModel";

interface NotificationData {
  type: "LIKE" | "COMMENT" | "FOLLOW";
  sender_id: string;
  receiver_id: string;
  post_id?: string;
  comment_id?: string;
  content?: string;
}

class NotificationService {
  private clients: Map<string, Response> = new Map();

  // 클라이언트 연결 등록
  public addClient(user_id: string, res: Response): void {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    });

    this.clients.set(user_id, res);
  }

  // 클라이언트 연결 해제
  public removeClient(user_id: string): void {
    this.clients.delete(user_id);
  }

  // 알림 전송 및 저장
  public async sendNotification(
    data: NotificationData
  ): Promise<INotification> {
    // DB에 알림 저장
    const notification = await this.saveNotificationToDB(data);

    // 실시간 알림 전송
    const client = this.clients.get(data.receiver_id);
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
      sender_id: data.sender_id,
      receiver_id: data.receiver_id,
      post_id: data.post_id,
      comment_id: data.comment_id,
      content: data.content,
      is_read: false,
      created_date: new Date(),
      updated_date: new Date(),
    });

    return await notification.save();
  }

  // 사용자의 읽지 않은 알림 개수 조회
  public async getUnreadCount(user_id: string): Promise<number> {
    return await Notification.countDocuments({
      receiver_id: user_id,
      is_read: false,
    });
  }

  // 사용자의 알림 목록 조회
  public async getNotifications(
    user_id: string,
    page: number = 1,
    limit: number = 20
  ): Promise<INotification[]> {
    return await Notification.find({ receiver_id: user_id })
      .sort({ created_date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("sender_id", "username profile_image")
      .populate("post_id", "title")
      .exec();
  }

  // 알림 읽음 처리
  public async markAsRead(
    notification_id: string,
    user_id: string
  ): Promise<INotification | null> {
    return await Notification.findOneAndUpdate(
      { _id: notification_id, receiver_id: user_id },
      { is_read: true },
      { new: true }
    );
  }

  // 모든 알림 읽음 처리
  public async markAllAsRead(user_id: string): Promise<void> {
    await Notification.updateMany(
      { receiver_id: user_id, is_read: false },
      { is_read: true }
    );
  }

  // 알림 삭제
  public async deleteNotification(
    notification_id: string,
    user_id: string
  ): Promise<boolean> {
    const result = await Notification.deleteOne({
      _id: notification_id,
      receiver_id: user_id,
    });
    return result.deletedCount > 0;
  }

  // 오래된 알림 정리 (예: 30일 이상 된 알림)
  public async cleanOldNotifications(days: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    await Notification.deleteMany({
      created_date: { $lt: cutoffDate },
    });
  }
}

export default new NotificationService();
