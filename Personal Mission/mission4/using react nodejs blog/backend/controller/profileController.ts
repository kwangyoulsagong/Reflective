import { Request,Response } from "express";
import profileService from "../service/profileService";
interface DecodedToken {
    user_id: string;
    iat: number;
    exp: number;
}
interface AuthRequest extends Request {
    user?: DecodedToken;
}
class ProfileController{
    public async GetProfile(req:AuthRequest, res:Response): Promise<void>{
        try{
            if (!req.user) {
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }

            const userId = req.user.user_id;
            const result=await profileService.GetProfile(userId);
            console.log(result)
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

    public async UpdateProfileImage(req:AuthRequest, res:Response): Promise<void>{
        try{
            const {image_url}=req.body
            console.log(image_url)
            if(!req.user){
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }
            const userId = req.user.user_id;
            const result = await profileService.UpdateProfileImage(userId,image_url)
            if(result){
                res.json(result)
            }
            else {
                res.status(401).json({ message: "인증 권한 없음" });
            };
        }
        catch(error:any){
            console.log(error)
            res.status(401).json({ error: error.message });
        }
    }
    
}
export default new ProfileController