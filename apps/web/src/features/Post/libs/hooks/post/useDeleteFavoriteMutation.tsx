import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePostFavorite from "../../../api/Post/favorites/deletePostFavorite";
import { queryKeys } from "../../../../../shared/constants/queryKeys";

const useDeleteFavoriteMutation = (post_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostFavorite,
    onMutate: async () => {
      const previousFavorites = queryClient.getQueryData([
        queryKeys.PostFavorite,
        post_id,
      ]);
      queryClient.setQueryData([queryKeys.PostFavorite, post_id], () => ({
        is_favorite: false,
      }));
      return { previousFavorites };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        [queryKeys.PostFavorite, post_id],
        context?.previousFavorites
      );
      alert(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PostFavorite, post_id],
      });
    },
  });
};
export default useDeleteFavoriteMutation;
