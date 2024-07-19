import { Request,Response } from "express";
import postService from "../service/postService";
interface DecodedToken {
    user_id: string;
    iat: number;
    exp: number;
}
interface AuthRequest extends Request {
    user?: DecodedToken;
}
class PostController{
    public async savePost(req:AuthRequest, res:Response){
       try{
            const data=req.body
            if (!req.user) {
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }

            const userId = req.user.user_id
            const result=await postService.savePost(userId,data)
            console.log(result)
            res.status(200).json({message:"게시물 저장 성공"})
       }
       catch(error:any){
            res.status(500).json({error:error.message})
       }

    }
}
export default new PostController