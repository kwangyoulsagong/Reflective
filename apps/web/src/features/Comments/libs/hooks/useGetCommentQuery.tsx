import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import fetchComment from "../../api/fetchComment";

const useGetCommentQuery = (post_id: string) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.FetchComment, post_id],
    queryFn: () => fetchComment(post_id),
  });
};
export default useGetCommentQuery;
