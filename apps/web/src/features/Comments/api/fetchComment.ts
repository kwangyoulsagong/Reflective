import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchComment = async (post_id: string) => {
  const { data } = await axiosInstance.get(END_POINTS.COMMENT(post_id), {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return data;
};
export default fetchComment;
