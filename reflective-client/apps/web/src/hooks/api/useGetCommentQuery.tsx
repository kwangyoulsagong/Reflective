import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import fetchComment from "../../api/comment/fetchComment";

const useGetCommentQuery = (post_id: string) => {
  return useQuery({
    queryKey: [queryKeys.FetchComment, post_id],
    queryFn: () => fetchComment(post_id),
  });
};
export default useGetCommentQuery;
