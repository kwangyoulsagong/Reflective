import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import fetchPostFavorite from "../../api/favorite/fetchPostFavorite";

const useGetPostFavoritesQuery = (post_id: string) => {
  return useQuery({
    queryKey: [queryKeys.PostFavorite, post_id],
    queryFn: () => fetchPostFavorite(post_id),
  });
};

export default useGetPostFavoritesQuery;
