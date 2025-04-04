import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "./constants/queryKeys";
import fetchPosts from "./api/Post/fetchPosts";
import { useApiError } from "./useApiError";
import { useEffect } from "react";

const useInfinitePostsQuery = () => {
  const { handleError } = useApiError();

  const result = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.RecentPost],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const { error, status } = result;

  useEffect(() => {
    if (status === "error" && error) {
      handleError(error);
    }
  }, [error, status, handleError]);

  const flattenedPosts = result.data?.pages.flatMap((page) => page.posts) || [];

  return {
    posts: flattenedPosts,
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
  };
};

export default useInfinitePostsQuery;
