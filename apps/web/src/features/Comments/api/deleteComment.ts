import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const deleteComment = async (comment_id: string) => {
  const { data } = await axiosInstance.delete(END_POINTS.COMMENT(comment_id));
  return data;
};
export default deleteComment;
