import { Request,Response } from "express";
import postService from "../service/postService";

class PostController{
    public async savePost(req:Request, res:Response){
       try{
            const data=req.body
            const result=await postService.savePost(data)
            console.log(result)
            res.status(200).json({message:"게시물 저장 성공"})
       }
       catch(error:any){
            res.status(500).json({error:error.message})
       }

    }
}
export default new PostController