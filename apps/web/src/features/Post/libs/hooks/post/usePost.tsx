import { useEffect, useState } from "react";
import useDeleteFavoriteMutation from "./useDeleteFavoriteMutation";
import useDeletePostMutation from "./useDeletePostMutation";
import useSaveFavoritesMutation from "./useSaveFavoritesMutation";
import { useNavigate } from "react-router-dom";
import useGetPostFavoritesQuery from "./useGetPostFavoritesQuery";

import { usePost_idStore } from "../../../../../app/provider/post_idProvider";
import { getPostType } from "../../../model/post/type";

const usePost = ({ data }: { data: Partial<getPostType> }) => {
  const { post_id } = usePost_idStore();

  const { mutate: deleteMutate } = useDeletePostMutation();
  const { mutate: saveFavoriteMutate } = useSaveFavoritesMutation(post_id);
  const { mutate: deleteFavoriteMutate } = useDeleteFavoriteMutation(post_id);
  const { data: favorite } = useGetPostFavoritesQuery(data?.post_id || "");

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorite) {
      setIsFavorite(favorite.is_favorite);
    }
  }, [favorite]);
  const navigate = useNavigate();
  const handleDeletePost = async (post_id: string) => {
    deleteMutate(post_id);
  };

  const handleUpdatePost = () => {
    navigate("/write", { state: { post: data } });
  };

  const handleAddFavorite = async (user_id: string) => {
    if (isFavorite) {
      deleteFavoriteMutate(user_id);
    } else {
      const body = {
        favorite_id: user_id,
      };
      saveFavoriteMutate(body);
    }
  };
  return { isFavorite, handleDeletePost, handleUpdatePost, handleAddFavorite };
};
export default usePost;
