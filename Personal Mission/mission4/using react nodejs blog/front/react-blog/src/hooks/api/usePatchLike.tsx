import { axiosInstance } from "../../api/axiosinstance";
import { END_POINTS } from "../../constants/api";

const UsePatchLike = async (post_id: string, body: object) => {
  try {
    const response = await axiosInstance.patch(END_POINTS.PATCHLIKE(post_id), {
      body,
    });

    return response.data;
  } catch (error) {
    console.error("좋아요 업데이트 에러", error);
  }
};
export default UsePatchLike;
