import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateComment from "../../api/comment/updateComment";
import { queryKeys } from "../../constants/queryKeys";
import { commentState } from "../../types/types";
interface UpdateCommentParams {
  comment_id: string;
  content: string;
}
const useUpdateCommentMutation = (post_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onMutate: ({ comment_id, content }: UpdateCommentParams) => {
      const previousComments = queryClient.getQueryData([
        queryKeys.FetchComment,
        post_id,
      ]);
      queryClient.setQueryData<commentState[]>(
        [queryKeys.FetchComment, post_id],
        (old) =>
          old?.map((c) =>
            c.comment_id === comment_id ? { ...c, content: content } : c
          )
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

export default useUpdateCommentMutation;
