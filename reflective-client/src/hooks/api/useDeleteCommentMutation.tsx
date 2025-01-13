import { useMutation } from "@tanstack/react-query";
import deleteComment from "../../api/comment/deleteComment";

const useDeleteCommentMutation = () => {
  return useMutation({
    mutationFn: deleteComment,
    onError: (error) => {
      alert(error);
    },
  });
};
export default useDeleteCommentMutation;
