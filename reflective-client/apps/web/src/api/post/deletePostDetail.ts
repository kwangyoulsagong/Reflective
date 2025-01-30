import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

const deletePostDetail = async (post_id: string) => {
  const { data } = await axiosInstance.delete(END_POINTS.POST(post_id));
  return data;
};
export default deletePostDetail;
