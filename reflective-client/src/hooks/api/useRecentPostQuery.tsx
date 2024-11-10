import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import fetchRecentPost from "../../api/post/fetchRecentPost";

const useRecentPostQuery = () => {
  return useQuery({
    queryKey: queryKeys.RecentPost,
    queryFn: fetchRecentPost,
  });
};

export default useRecentPostQuery;
