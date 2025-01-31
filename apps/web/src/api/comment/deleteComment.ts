import { axiosInstance } from "../axiosinstance";

const deleteComment = async (comment_id: string) => {
  const { data } = await axiosInstance.delete(END_POINTS.COMMENT(comment_id));
  return data;
};
export default deleteComment;
