import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import fetchComment from "../../api/comment/fetchComment";

const useGetCommentQuery = (post_id: string) => {
  return useQuery({
    queryKey: queryKeys.FetchComment,
    queryFn: () => fetchComment(post_id),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};
export default useGetCommentQuery;
