import Profile, { IProfile } from "../model/profileModel";
import User, { IUser } from "../model/userModel";

interface responseProfile {
  nickname: string;
  email: string;
  phone_number: string;
  image_url: string;
  status_message: string;
}

class ProfileService {
  //프로필 조회
  public async GetProfile(user_id: string): Promise<responseProfile | null> {
    console.log(user_id);
    const profile = await Profile.findOne({ user_id: user_id });
    console.log(profile);

    if (!profile) {
      throw new Error("프로필을 찾을 수 없습니다.");
    }

    const user = await User.findOne({ user_id: user_id });

    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    return {
      nickname: user.nickname,
      email: user.email,
      phone_number: user.phone_number,
      image_url: profile.image_url,
      status_message: profile.status_message,
    };
  }

  // 프로필 이미지 업데이트
  public async UpdateProfileImage(
    user_id: string,
    img: string
  ): Promise<IProfile | null> {
    // 회원 프로필 찾기
    const profile = await Profile.findOneAndUpdate(
      { user_id: user_id },
      { image_url: img, updated_date: Date.now() },
      { new: true }
    );

    if (!profile) {
      throw new Error("프로필을 찾을 수 없습니다.");
    }
    return await profile;
  }

  // 프로필 정보 업데이트
  public async UpdateProfile(
    user_id: string,
    data: IUser
  ): Promise<IUser | null> {
    const profile = await User.findOneAndUpdate(
      { user_id: user_id },
      {
        nickname: data.nickname,
        phone_number: data.phone_number,
        updated_date: Date.now(),
      },
      { new: true }
    );

    if (!profile) {
      throw new Error("프로필을 찾을 수 없습니다.");
    }
    return await profile;
  }

  // 상태 메시지 업데이트
  public async UpdateStatusMessage(
    user_id: string,
    status_message: string
  ): Promise<IProfile | null> {
    // 유저 프로필 찾기
    let profile = await Profile.findOne({ user_id: user_id });

    // 프로필이 없으면 새로 생성
    if (!profile) {
      profile = await Profile.create({
        user_id: user_id,
        status_message: status_message,
        created_date: Date.now(),
        updated_date: Date.now(),
      });
    } else {
      // 프로필이 있으면 상태 메시지 업데이트
      profile = await Profile.findOneAndUpdate(
        { user_id: user_id },
        { status_message: status_message, updated_date: Date.now() },
        { new: true }
      );
    }

    return profile;
  }
}
export default new ProfileService();
