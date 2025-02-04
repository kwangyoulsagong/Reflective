import Profile,{IProfile} from "../model/profileModel";
import User,{IUser} from "../model/userModel";

interface responseProfile{
    nickname:string,
    email:string,
    phone_number:string,
    image_url:string
}

class ProfileService{
    //프로필 조회
    public async GetProfile(user_id:string):Promise<responseProfile|null>{
        console.log(user_id)
        const profile = await Profile.findOne({ user_id: user_id });
        console.log(profile)

        if (!profile) {
            throw new Error('프로필을 찾을 수 없습니다.');
        }

        const user = await User.findOne({user_id:user_id});

        if (!user) {
            throw new Error('유저를 찾을 수 없습니다.');
        }

        return {
            nickname: user.nickname,
            email: user.email,
            phone_number: user.phone_number,
            image_url: profile.image_url,
        };
    }
    
    // 프로필 이미지 업데이트
    public async UpdateProfileImage( user_id:string, img:string):Promise<IProfile|null>{
        // 회원 프로필 찾기
        const profile = await Profile.findOneAndUpdate({user_id:user_id},{image_url:img,updated_date:Date.now()},{new:true})

        if (!profile) {
            throw new Error('프로필을 찾을 수 없습니다.');
        }
        return await profile
    }

    // 프로필 정보 업데이트
    public async UpdateProfile(user_id:string, data:IUser):Promise<IUser|null>{
        const profile=await User.findOneAndUpdate({user_id:user_id},{nickname:data.nickname,phone_number:data.phone_number,updated_date:Date.now()},{new:true})

        if(!profile){
            throw new Error('프로필을 찾을 수 없습니다.');
        }
        return await profile
    }
}
export default new ProfileService()