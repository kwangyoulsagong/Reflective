import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../shared/constants/queryKeys";
import fetchPostDetail from "../../../api/Post/fetchPostDetail";

const usePostDetailQuery = (post_id: string) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.PostDetail, post_id],
    queryFn: () => fetchPostDetail(post_id),
  });
};

export default usePostDetailQuery;
