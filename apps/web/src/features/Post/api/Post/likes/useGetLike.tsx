import { axiosInstance } from "../../../../../shared/api/axiosinstance";
import { END_POINTS } from "../../../../../shared/constants/api";

const UseGetLike = async (post_id: string) => {
  try {
    const response = await axiosInstance.get(END_POINTS.PATCHLIKE(post_id));

    const data = await response.data;
    return data;
  } catch (error) {
    console.error("좋아요 확인 여부 에러", error);
  }
};
export default UseGetLike;
