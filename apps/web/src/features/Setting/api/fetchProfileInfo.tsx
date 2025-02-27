import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchProfileInfo = async () => {
  try {
    const { data } = await axiosInstance.get(END_POINTS.MYPROFILE);

    return data;
  } catch (error) {
    console.error("프로필 조회 로딩 오류:", error);
  }
};
export default fetchProfileInfo;
