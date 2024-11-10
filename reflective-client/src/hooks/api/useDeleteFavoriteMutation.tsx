import { useMutation } from "@tanstack/react-query";
import deletePostFavorite from "../../api/favorite/deletePostFavorite";

const useDeleteFavoriteMutation = () => {
  return useMutation({
    mutationFn: deletePostFavorite,
    onError: (error) => {
      alert(error);
    },
  });
};
export default useDeleteFavoriteMutation;
