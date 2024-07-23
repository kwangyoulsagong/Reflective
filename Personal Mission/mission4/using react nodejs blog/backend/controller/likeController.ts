import likeService from "../service/likeService";
import  { Request,Response } from "express";

interface DecodedToken {
    user_id: string;
    iat: number;
    exp: number;
}
interface AuthRequest extends Request {
    user?: DecodedToken;
}

// 좋아요 컨트롤러
class LikeController{

    public async toggleLike(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { post_id } = req.params;
            const {is_liked}  = req.body;
          
            if (!req.user) {
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }
            const userId = req.user.user_id
            const result = await likeService.IsLike(post_id, userId, is_liked);
            console.log(result)
            if (result) {
                res.status(200).json({ message: is_liked ? '좋아요 추가 성공' : '좋아요 제거 성공' });
            } else {
                res.status(400).json({ message: '좋아요 업데이트 실패' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
export default new LikeController