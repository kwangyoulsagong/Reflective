import { END_POINTS } from "../../../../shared/constants/api";
import { axiosInstance } from "../../../../shared/api/axiosinstance";

const deletePostDetail = async (post_id: string) => {
  const { data } = await axiosInstance.delete(END_POINTS.POST(post_id));
  return data;
};
export default deletePostDetail;
