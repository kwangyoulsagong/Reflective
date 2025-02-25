import { useMutation, useQueryClient } from "@tanstack/react-query";
import savePostFavorite from "../../../api/Post/favorites/savePostFavorite";
import { queryKeys } from "../../../../../shared/constants/queryKeys";

const useSaveFavoritesMutation = (post_id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePostFavorite,
    onMutate: async (newFavorite: { favorite_id: string }) => {
      const previousFavorites = queryClient.getQueryData([
        queryKeys.PostFavorite,
        post_id,
      ]);
      queryClient.setQueryData(
        [queryKeys.PostFavorite, post_id],
        (old: { is_favorite: boolean }) => ({
          ...old,
          favorite: newFavorite,
          is_favorite: true,
        })
      );
      return { previousFavorites };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        [queryKeys.PostFavorite, post_id],
        context?.previousFavorites
      );
      alert(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PostFavorite, post_id],
      });
    },
  });
};
export default useSaveFavoritesMutation;
