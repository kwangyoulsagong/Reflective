import { useMutation } from "@tanstack/react-query";
import savePostFavorite from "../../api/favorite/savePostFavorite";

const useSaveFavoritesMutation = () => {
  return useMutation({
    mutationFn: savePostFavorite,
  });
};
export default useSaveFavoritesMutation;
