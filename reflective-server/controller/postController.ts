import { Request, Response } from "express";
import postService from "../service/postService";

interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}
interface AuthRequest extends Request {
  user?: DecodedToken;
}
class PostController {
  // 게시물 저장
  public async savePost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = req.body;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const result = await postService.savePost(userId, data);
      res.status(200).json({ message: "게시물 저장 성공", result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  // 최근 게시물 조회
  public async getRecentPost(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.getRecentPost();
      if (posts) {
        res.json(posts);
      } else {
        res.status(404).json({ message: "게시물 없음" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시물 조회 에러", error });
    }
  }

  // 상세 게시물 조회
  public async getPostDetail(req: Request, res: Response): Promise<void> {
    const { post_id } = req.params;
    console.log(post_id);
    try {
      const posts = await postService.getPostDetail(post_id);
      if (posts) {
        res.json(posts);
      } else {
        res.status(404).json({ message: "게시물 없음" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시물 조회 에러", error });
    }
  }

  // 상세 게시물 수정
  public async updatePost(req: AuthRequest, res: Response): Promise<void> {
    const { post_id } = req.params;
    const data = req.body;
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;
      const updatedPost = await postService.updatePost(post_id, userId, data);
      if (updatedPost) {
        res.status(200).json({ message: "게시물이 수정 되었습니다." });
      } else {
        res.status(404).json({ message: "게시물 없음" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "게시물 수정 에러", error: error.message });
    }
  }

  // 상세 게시물 삭제
  public async deletePost(req: AuthRequest, res: Response): Promise<void> {
    const { post_id } = req.params;
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;
      const deletePost = await postService.deletePost(post_id, userId);
      if (deletePost) {
        res.status(200).json({ message: "게시물이 삭제 되었습니다." });
      } else {
        res.status(404).json({ message: "게시물 없음" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "게시물 삭제 에러", error: error.message });
    }
  }
}
export default new PostController();
