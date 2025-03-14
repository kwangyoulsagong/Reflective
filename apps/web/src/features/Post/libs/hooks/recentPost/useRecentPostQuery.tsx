import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../shared/constants/queryKeys";
import fetchRecentPost from "../../../api/recentPost/fetchRecentPost";

const useRecentPostQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.RecentPost,
    queryFn: fetchRecentPost,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};

export default useRecentPostQuery;
