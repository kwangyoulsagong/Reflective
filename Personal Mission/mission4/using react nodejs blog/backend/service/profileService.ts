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
}
export default new ProfileService()