import User, { IUser } from "../model/userModel";

class UserService {
    // 회원가입 서비스
    public async Register(data: IUser): Promise<IUser> {
        const user = new User(data);
        return await user.save();
    }

    // 로그인 서비스
    public async Login(email: string, password: string): Promise<IUser | null> {
        // 이메일로 사용자를 찾습니다.
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('유저 정보 없음');
        }

         // 비밀번호 검증
         if (user.password !== password) {
            throw new Error('비밀번호 다시 입력');
        }
        return user;
    }
}

export default new UserService();
