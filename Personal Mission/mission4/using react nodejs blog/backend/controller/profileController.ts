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

    // 프로필 조회
    public async GetProfile(req:AuthRequest, res:Response): Promise<void>{
        try{
            if (!req.user) {
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }

            const userId = req.user.user_id;
            const result=await profileService.GetProfile(userId);
            if (result) {
                res.json(result);
            } else {
                res.status(401).json({ message: "인증 권한 없음" });
            };
        }
        catch(error:any){
            res.status(401).json({ error: error.message });
        }
    }

    // 프로필 이미지 업데이트
    public async UpdateProfileImage(req:AuthRequest, res:Response): Promise<void>{
        try{
            const {image_url}=req.body
            if(!req.user){
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }
            const userId = req.user.user_id;
            const result = await profileService.UpdateProfileImage(userId,image_url)
            if(result){
                res.status(200).json({message:"프로필 이미지가 변경되었습니다."})
            }
            else {
                res.status(401).json({ message: "인증 권한 없음" });
            };
        }
        catch(error:any){
            res.status(401).json({ error: error.message });
        }
    }

    // 프로필 업데이트
    public async UpdateProfile(req:AuthRequest, res:Response): Promise<void>{
        try{
            const data=req.body
            if(!req.user){
                res.status(401).json({ message: '인증 권한 없음' });
                return;
            }
            const userId=req.user.user_id
            const result=await profileService.UpdateProfile(userId,data)
            if(result){
                res.status(200).json({message:"프로필이 변경되었습니다."})
            }
            else {
                res.status(401).json({ message: "인증 권한 없음" });
            };
        }
        catch(error:any){
            res.status(401).json({ error: error.message });
        }
    }

    
}
export default new ProfileController