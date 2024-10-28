import User, { IUser } from "../model/userModel";
import { generateToken, generateRefreshToken } from "../authorization/jwt";
import Profile from "../model/profileModel";
interface ILoginResponse {
  user_id: string;
  nickname: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
class UserService {
  // 회원가입 서비스
  public async Register(data: IUser): Promise<IUser> {
    // 유효성 검사: 필수 필드가 비어있는지 확인
    if (!data.email || !data.password || !data.nickname) {
      throw new Error("모든 필드를 입력해야 합니다.");
    }
    // 유저 중복 검증
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("이미 등록된 이메일입니다");
    }
    const user = new User(data);
    await user.save();

    // 회원 가입 성고시 프로필 추가
    const profileData = {
      user_id: user.user_id,
      image_url: null,
    };

    const profile = new Profile(profileData);
    await profile.save();
    return user;
  }

  // 로그인 서비스
  public async Login(
    email: string,
    password: string
  ): Promise<ILoginResponse | null> {
    // 이메일로 사용자 검증
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("유저 정보 없음");
    }

    // 비밀번호 검증
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("비밀번호 다시 입력");
    }
    const accessToken = generateToken({ user_id: user.user_id.toString() });
    const refreshToken = generateRefreshToken({
      user_id: user.user_id.toString(),
    });
    return {
      user_id: user.user_id.toString(),
      nickname: user.nickname,
      email: user.email,
      accessToken,
      refreshToken,
    };
  }
}

export default new UserService();
