import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchMyFollowers = async () => {
  try {
    const { data } = await axiosInstance.get(END_POINTS.MYFOLLOWERS);
    return data;
  } catch (error) {
    console.error("마이페이지 팔로워 조회 오류");
  }
};
export default fetchMyFollowers;
