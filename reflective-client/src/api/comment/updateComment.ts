import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

export interface updateCommentState {
  comment_id: string;
  content: string;
}
const updateComment = async ({ comment_id, content }: updateCommentState) => {
  const { data } = await axiosInstance.put(
    END_POINTS.COMMENT(comment_id),
    content
  );
  return data;
};
export default updateComment;
