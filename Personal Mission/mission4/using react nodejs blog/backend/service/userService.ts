import User, { IUser } from "../model/userModel";
import {generateToken,generateRefreshToken} from "../authorization/jwt"
interface ILoginResponse {
    nickname: string;
    accessToken: string;
    refreshToken: string;
}
class UserService {
    // 회원가입 서비스
    public async Register(data: IUser): Promise<IUser> {
        const user = new User(data);
        //유저 저장
        return await user.save();
    }

    // 로그인 서비스
    public async Login(email: string, password: string): Promise<ILoginResponse | null> {
        // 이메일로 사용자를 찾습니다.
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('유저 정보 없음');
        }

        // 비밀번호 검증
        const isMatch=await user.comparePassword(password)

        if(!isMatch){
            throw new Error('비밀번호 다시 입력')
        }
        const accessToken = generateToken({user_id:user.user_id.toString()});
        const refreshToken=generateRefreshToken({user_id:user.user_id.toString()})
        return { nickname: user.nickname, accessToken,refreshToken };
    }
}

export default new UserService();
