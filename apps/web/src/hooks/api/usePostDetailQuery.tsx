import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import fetchPostDetail from "../../api/post/fetchPostDetail";

const usePostDetailQuery = (post_id: string) => {
  return useQuery({
    queryKey: [queryKeys.PostDetail, post_id],
    queryFn: () => fetchPostDetail(post_id),
    throwOnError: true,
  });
};

export default usePostDetailQuery;
