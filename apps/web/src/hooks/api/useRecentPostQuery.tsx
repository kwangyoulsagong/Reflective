import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../shared/constants/queryKeys";
import fetchRecentPost from "../../api/post/fetchRecentPost";

const useRecentPostQuery = () => {
  return useQuery({
    queryKey: queryKeys.RecentPost,
    queryFn: fetchRecentPost,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};

export default useRecentPostQuery;
