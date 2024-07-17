import { Request,Response } from "express";
import userService from "../service/userService";

class UserController{
    // 회원가입 컨틀롤러 
    public async Register(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.Register(req.body);
            res.status(201).json(user);
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
}
export default new UserController