import { Request,Response } from "express";
import userService from "../service/userService";
class UserController{

  
    // 회원가입 컨틀롤러 
    public async Register(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.Register(req.body);
            console.log(user)
            res.status(201).json(user);
        } catch (error:any) {
            console.error(error)
            res.status(500).json({ error: error.message });
        }
    }
    public async Login(req:Request, res:Response): Promise<void>{
        const {email,password}=req.body
        try{
            const result=await userService.Login(email,password);
            if (result) {
                res.json(result);
            } else {
                res.status(401).json({ message: "인증 권한 없음" });
            };
        }
        catch(error:any){
            console.log(error)
            res.status(401).json({ error: error.message });
        }
    }
}
export default new UserController