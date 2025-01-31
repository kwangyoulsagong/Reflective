import { END_POINTS } from "../../shared/constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchRecentPost = async () => {
  const { data } = await axiosInstance.get(END_POINTS.SAVEPOST, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};

export default fetchRecentPost;
