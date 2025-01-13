import { useMutation } from "@tanstack/react-query";
import saveComment from "../../api/comment/saveComment";

const useSaveCommentMutation = () => {
  return useMutation({
    mutationFn: saveComment,
    onError: (error) => {
      alert(error);
    },
  });
};
export default useSaveCommentMutation;
