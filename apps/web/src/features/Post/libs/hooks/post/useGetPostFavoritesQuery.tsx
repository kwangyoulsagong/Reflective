import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../../shared/constants/queryKeys";
import fetchPostFavorite from "../../../api/Post/favorites/fetchPostFavorite";

const useGetPostFavoritesQuery = (post_id: string) => {
  return useSuspenseQuery({
    queryKey: [queryKeys.PostFavorite, post_id],
    queryFn: () => fetchPostFavorite(post_id),
  });
};

export default useGetPostFavoritesQuery;
