import { Response } from "express";
import Notification, { INotification } from "../model/notificationModel";
import mongoose, { Types } from "mongoose";

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
    // 기존 연결 종료 로직 수정
    const existingClient = this.clients.get(user_id);
    if (existingClient && !existingClient.writableEnded) {
      try {
        existingClient.write(
          `data: ${JSON.stringify({ type: "DISCONNECT" })}\n\n`
        );
        existingClient.end();
      } catch (error) {
        console.error("기존 클라이언트 종료 중 에러:", error);
      }
    }

    // 클라이언트 맵에 추가
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
    if (client && !client.writableEnded) {
      try {
        const eventData = JSON.stringify({
          ...notification.toObject(),
          type: "NOTIFICATION",
        });
        client.write(`data: ${eventData}\n\n`);
      } catch (error) {
        console.error("알림 전송 중 에러:", error);
        this.removeClient(data.receiver_id);
      }
    }

    return notification;
  }

  // DB에 알림 저장
  private async saveNotificationToDB(
    data: NotificationData
  ): Promise<INotification> {
    console.log("저장 전 데이터 확인:", data); // 데이터 형식 확인
    const notification = new Notification({
      type: data.type,
      sender_id: new Types.ObjectId(data.sender_id), // ObjectId로 변환
      receiver_id: new Types.ObjectId(data.receiver_id), // ObjectId로 변환
      post_id: data.post_id ? new Types.ObjectId(data.post_id) : undefined,
      comment_id: data.comment_id
        ? new Types.ObjectId(data.comment_id)
        : undefined,
      content: data.content,
      is_read: false,
      created_date: new Date(),
      updated_date: new Date(),
    });

    const savedNotification = await notification.save();
    console.log("저장된 데이터:", savedNotification); // 저장된 결과 확인

    return savedNotification;
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
    try {
      const userObjectId = new Types.ObjectId(user_id);

      return await Notification.find({
        receiver_id: userObjectId,
      })
        .sort({ created_date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: "sender_id",
          model: "User",
          localField: "sender_id",
          foreignField: "user_id",
          select: "nickname profile_image",
        })
        .populate({
          path: "post_id",
          model: "Post",
          localField: "post_id",
          foreignField: "post_id",
          select: "title",
        })
        .exec();
    } catch (error) {
      console.error("알림 조회 중 에러:", error);
      throw error;
    }
  }

  // 알림 읽음 처리
  public async markAsRead(
    notification_id: string,
    user_id: string
  ): Promise<INotification | null> {
    try {
      console.log("읽음 처리 시도:", { notification_id, user_id });

      const notificationObjectId = new Types.ObjectId(notification_id);
      const userObjectId = new Types.ObjectId(user_id);

      const notification = await Notification.findOneAndUpdate(
        {
          _id: notificationObjectId, // _id 대신 notification_id 사용
          receiver_id: userObjectId,
        },
        { is_read: true },
        {
          new: true,
          runValidators: true,
        }
      );

      console.log("읽음 처리 결과:", notification);

      if (!notification) {
        throw new Error("알림을 찾을 수 없습니다.");
      }

      return notification;
    } catch (error) {
      console.error("알림 읽음 처리 중 에러:", error);
      throw error;
    }
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
    const notificationObjectId = new Types.ObjectId(notification_id);
    const userObjectId = new Types.ObjectId(user_id);
    const result = await Notification.deleteOne({
      _id: notificationObjectId,
      receiver_id: userObjectId,
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
