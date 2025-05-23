import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteComment from "../../api/deleteComment";
import { commentState } from "../../../../types/types";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import { useApiError } from "../../../../shared/useApiError";

const useDeleteCommentMutation = (post_id: string) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
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
      handleError(err);
    },
  });
};
export default useDeleteCommentMutation;
