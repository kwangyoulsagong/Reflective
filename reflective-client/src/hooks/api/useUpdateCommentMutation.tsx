import { useMutation } from "@tanstack/react-query";
import updateComment from "../../api/comment/updateComment";
import { AxiosError } from "axios";

const useUpdateCommentMutation = () => {
  return useMutation({
    mutationFn: updateComment,
    onError: (error: AxiosError) => {
      alert(error);
    },
  });
};

export default useUpdateCommentMutation;
