import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchMyFollowings = async () => {
  try {
    const { data } = await axiosInstance.get(END_POINTS.MYFOLLOWINGS);
    return data;
  } catch (error) {
    console.error("마이페이지 팔로잉 조회 오류");
  }
};
export default fetchMyFollowings;
