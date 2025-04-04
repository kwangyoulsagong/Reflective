import { Request, Response } from "express";
import favoriteService from "../service/favoriteService";
import notificationService from "../service/notificationService";

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
        if (userId !== favorite_id) {
          await notificationService.sendNotification({
            type: "FOLLOW",
            sender_id: userId,
            receiver_id: favorite_id,
          });
        }
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

  public async getFavoriteStory(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;
      const posts = await favoriteService.getFavoriteStory(userId);
      // posts가 없더라도 빈 배열 반환
      res.status(200).json(posts || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getMyProfileInfo(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const profileInfo = await favoriteService.getMyProfile(userId);

      if (!profileInfo) {
        res.status(404).json({ message: "프로필 정보를 찾을 수 없습니다." });
        return;
      }

      res.status(200).json(profileInfo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getMyFollowers(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const followers = await favoriteService.getMyFollowers(userId);
      res.status(200).json(followers || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getMyFollowing(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const userId = req.user.user_id;
      const following = await favoriteService.getMyFollowing(userId);
      res.status(200).json(following || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // 다른 사용자 프로필 조회 메서드
  public async getUserProfileInfo(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const { user_id } = req.params;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const currentUserId = req.user.user_id;
      const profileInfo = await favoriteService.getUserProfile(
        user_id,
        currentUserId
      );

      if (!profileInfo) {
        res.status(404).json({ message: "프로필 정보를 찾을 수 없습니다." });
        return;
      }

      res.status(200).json(profileInfo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getUserFollowers(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const { user_id } = req.params;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const followers = await favoriteService.getUserFollowers(user_id);
      res.status(200).json(followers || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getUserFollowing(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      const { user_id } = req.params;
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }

      const following = await favoriteService.getUserFollowing(user_id);
      res.status(200).json(following || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new FavoriteController();
