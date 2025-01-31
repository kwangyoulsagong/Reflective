import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteComment from "../../api/comment/deleteComment";

import { commentState } from "../../types/types";
import { queryKeys } from "../../shared/constants/queryKeys";

const useDeleteCommentMutation = (post_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onMutate: (comment_id) => {
      const previousComments = queryClient.getQueryData([
        queryKeys.FetchComment,
        post_id,
      ]);

      queryClient.setQueryData(
        [queryKeys.FetchComment, post_id],
        (old: commentState[] = []) =>
          old.filter((c) => c.comment_id !== comment_id)
      );
      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FetchComment, post_id],
      });
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        [queryKeys.FetchComment, post_id],
        context?.previousComments
      );
      alert(err);
    },
  });
};
export default useDeleteCommentMutation;
