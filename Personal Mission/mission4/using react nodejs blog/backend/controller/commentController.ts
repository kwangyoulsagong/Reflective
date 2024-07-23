import { Request,Response } from "express";
import commentService from "../service/commentService";


interface DecodedToken {
    user_id: string;
    iat: number;
    exp: number;
}
interface AuthRequest extends Request {
    user?: DecodedToken;
}


class CommentController{

    // 댓글 작성 컨트롤러
    public async saveComment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const data = req.body;
            if (!req.user) {
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }

            const userId = req.user.user_id;
            const result = await commentService.saveComment(userId, data);
            if (result) {
                res.status(200).json({ message: "댓글 저장 성공" });
                return;
            }
            res.status(404).json({ message: "댓글 저장 실패" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // 댓글 조회 컨트롤러
    public async getComment(req:Request, res:Response): Promise<void>{
        try{
            const {post_id}=req.params
            const comments = await commentService.getComment(post_id)
            console.log(comments)
            if(comments){
                res.status(200).json(comments)
            }
            else{
                res.status(404).json({message:"댓글이 없습니다."})
            }
        }
        catch(error:any){
            res.status(500).json({ error: error.message });
        }
    }

    // 댓글 수정 컨트롤러
    
}

export default new CommentController