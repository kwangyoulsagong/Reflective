import { Request, Response } from "express";
import commentService from "../service/commentService";
import notificationService from "../service/notificationService";

interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}
interface AuthRequest extends Request {
  user?: DecodedToken;
}

class CommentController {
  // 댓글 작성 컨트롤러
  public async saveComment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = req.body;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const result = await commentService.saveComment(userId, data);
      if (result?.post_id && result.author_id) {
        await notificationService.sendNotification({
          type: "COMMENT",
          sender_id: userId,
          receiver_id: result.author_id,
          post_id: result.post_id,
        });
        res.status(200).json({ message: "댓글 저장 성공" });
        return;
      }
      res.status(404).json({ message: "댓글 저장 실패" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 댓글 조회 컨트롤러
  public async getComment(req: Request, res: Response): Promise<void> {
    try {
      const { post_id } = req.params;
      const comments = await commentService.getComment(post_id);
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "댓글이 없습니다." });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 댓글 수정 컨트롤러
  public async updateComment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { comment_id } = req.params;
      const data = req.body;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const updateComment = await commentService.updateComment(
        comment_id,
        userId,
        data
      );

      if (updateComment) {
        res.status(200).json({ message: "댓글이 수정 되었습니다." });
      } else {
        res.status(404).json({ message: "댓글 없음" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 댓글 삭제
  public async deleteComment(req: AuthRequest, res: Response): Promise<void> {
    const { comment_id } = req.params;
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;
      const deleteComment = await commentService.deleteComment(
        comment_id,
        userId
      );
      if (deleteComment) {
        res.status(200).json({ message: "댓글이 삭제 되었습니다." });
      } else {
        res.status(404).json({ message: "댓글 없음" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "댓글 삭제 에러", error: error.message });
    }
  }
}

export default new CommentController();
