import { END_POINTS } from "./api";
import { axiosInstance } from "../api/axiosinstance";

const fetchProfile = async () => {
  try {
    const [profileResponse, favoriteResponse] = await Promise.all([
      axiosInstance.get(END_POINTS.MYPROFILE),
      axiosInstance.get(END_POINTS.MYFAVORITES),
    ]);
    return {
      myProfile: profileResponse.data || [],
      myFavorites: favoriteResponse.data || [],
      success: true,
    };
  } catch (error) {
    console.error("마이페이지 프로필 데이터 로딩 오류:", error);
  }
};
export default fetchProfile;
