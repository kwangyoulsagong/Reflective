import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/constants/queryKeys";
import deleteFavorite from "../../api/deleteFavorite";

const useDeleteFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFavorite,
    onMutate: async () => {
      const previousFavorites = queryClient.getQueryData([
        queryKeys.PostFavorite,
      ]);
      queryClient.setQueryData([queryKeys.PostFavorite], () => ({
        is_favorite: false,
      }));
      return { previousFavorites };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        [queryKeys.PostFavorite],
        context?.previousFavorites
      );
      alert(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PostFavorite],
      });
    },
  });
};
export default useDeleteFavoriteMutation;
