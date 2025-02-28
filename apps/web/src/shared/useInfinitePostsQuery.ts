import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "./constants/queryKeys";
import fetchPosts from "./api/Post/fetchPosts";

const useInfinitePostsQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: [queryKeys.RecentPost],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const flattenedPosts = data?.pages.flatMap((page) => page.posts) || [];

  return {
    posts: flattenedPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isLoading: status === "pending",
    isError: status === "error",
  };
};
export default useInfinitePostsQuery;
