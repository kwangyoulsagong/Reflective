import { Request, Response } from "express";
import favoriteService from "../service/favoriteService";

interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}
interface AuthRequest extends Request {
  user?: DecodedToken;
}

class FavoriteController {
  // 즐겨찾기 추가 메서드
  public async saveFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { favorite_id } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const result = await favoriteService.addFavorite(userId, favorite_id);
      if (result) {
        res.status(200).json({ message: "즐겨찾기 추가 성공" });
        return;
      }
      res.status(404).json({ message: "즐겨찾기 추가 실패" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 즐겨찾기 삭제 메서드
  public async removeFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { favorite_id } = req.params;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const result = await favoriteService.removeFavorite(userId, favorite_id);
      if (result) {
        res.status(200).json({ message: "즐겨찾기 삭제 성공" });
        return;
      }
      res.status(404).json({ message: "즐겨찾기 삭제 실패" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  // 포스트에 대한 즐겨찾기 여부 확인 컨트롤러
  public async getPostFavorite(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { post_id } = req.params; // 요청 파라미터에서 post_id 가져오기
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id; // 현재 사용자 ID
      const favorite = await favoriteService.getPostFavorite(userId, post_id);
      if (favorite) {
        res.status(200).json({ is_favorite: true, favorite });
        return;
      }
      res.status(200).json({ is_favorite: false }); // 즐겨찾기하지 않은 경우
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new FavoriteController();
