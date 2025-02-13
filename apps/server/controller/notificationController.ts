import { Request, Response } from "express";
import notificationService from "../service/notificationService";

interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}

interface AuthRequest extends Request {
  user?: DecodedToken;
}

class NotificationController {
  // SSE 연결 설정
  public async subscribe(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const user_id = req.user.user_id;

      // SSE 헤더 설정
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      });

      // 클라이언트 연결 등록
      notificationService.addClient(user_id, res);

      // 연결 종료 시 클라이언트 제거
      req.on("close", () => {
        notificationService.removeClient(user_id);
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 알림 목록 조회
  public async getNotifications(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const notifications = await notificationService.getNotifications(
        req.user.user_id,
        page
      );
      const unreadCount = await notificationService.getUnreadCount(
        req.user.user_id
      );

      res.status(200).json({
        notifications,
        unreadCount,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 알림 읽음 처리
  public async markAsRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const { notification_id } = req.params;
      const notification = await notificationService.markAsRead(
        notification_id,
        req.user.user_id
      );

      if (notification) {
        res.status(200).json(notification);
      } else {
        res.status(404).json({ message: "알림을 찾을 수 없습니다." });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 모든 알림 읽음 처리
  public async markAllAsRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      await notificationService.markAllAsRead(req.user.user_id);
      res.status(200).json({ message: "모든 알림이 읽음 처리되었습니다." });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 알림 삭제
  public async deleteNotification(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const { notification_id } = req.params;
      const result = await notificationService.deleteNotification(
        notification_id,
        req.user.user_id
      );

      if (result) {
        res.status(200).json({ message: "알림이 삭제되었습니다." });
      } else {
        res.status(404).json({ message: "알림을 찾을 수 없습니다." });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new NotificationController();
