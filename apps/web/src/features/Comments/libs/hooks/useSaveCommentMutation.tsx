import { useMutation, useQueryClient } from "@tanstack/react-query";
import saveComment from "../../api/saveComment";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import { commentState } from "../../../../types/types";
import { useApiError } from "../../../../shared/useApiError";
const useSaveCommentMutation = (post_id: string) => {
  const queryClient = useQueryClient();
  const nickname = localStorage.getItem("nickname");
  const { handleError } = useApiError();
  return useMutation({
    mutationFn: saveComment,
    onMutate: async (newComment: {
      content: string;
      parent_comment_id: string | null;
    }) => {
      const previousComments = queryClient.getQueryData([
        queryKeys.FetchComment,
        post_id,
      ]);
      // 낙관적 업데이트
      queryClient.setQueryData(
        [queryKeys.FetchComment, post_id],
        (old: commentState[] = []) => {
          const optimisticComment = {
            comment_id: `temp-${Date.now()}`,
            content: newComment.content,
            created_date: new Date().toISOString(),
            parent_comment_id: newComment.parent_comment_id,
            nickanme: nickname || "",
            replies: [],
          };
          return [...old, optimisticComment];
        }
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
export default useSaveCommentMutation;
