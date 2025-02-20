import { Request, Response } from "express";
import rankingService from "../service/rankingService";
interface DecodedToken {
  user_id: string;
  iat: number;
  exp: number;
}

interface AuthRequest extends Request {
  user?: DecodedToken;
}
class RankingController {
  // 특정 유저 랭킹 조회
  public async getUserRank(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "인증 권한 없음" });
        return;
      }
      const userId = req.user.user_id;

      const userRank = await rankingService.getUserRank(userId);

      if (userRank) {
        res.status(200).json(userRank);
      } else {
        res.status(404).json({ message: "유저 없음" });
      }
    } catch (error) {
      console.error("유저 랭킹 조회 컨트롤러 에러", error);
      res.status(500).json({
        message: "서버 오류가 발생했습니다.",
      });
    }
  }
}

export default new RankingController();
