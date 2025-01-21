import { useEffect, useState } from "react";
import useDeleteFavoriteMutation from "../api/useDeleteFavoriteMutation";
import useDeletePostMutation from "../api/useDeletePostMutation";
import useSaveFavoritesMutation from "../api/useSaveFavoritesMutation";
import { useNavigate } from "react-router-dom";
import useGetPostFavoritesQuery from "../api/useGetPostFavoritesQuery";
import { getPostType } from "../../types/types";

const usePost = ({ data }: { data: Partial<getPostType> }) => {
  const { mutate: deleteMutate } = useDeletePostMutation();
  const { mutate: saveFavoriteMutate } = useSaveFavoritesMutation();
  const { mutate: deleteFavoriteMutate } = useDeleteFavoriteMutation();
  const { data: favorite, refetch } = useGetPostFavoritesQuery(
    data?.post_id || ""
  );

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
      refetch();
    } else {
      const body = {
        favorite_id: user_id,
      };
      saveFavoriteMutate(body);
      refetch();
    }
  };
  return { isFavorite, handleDeletePost, handleUpdatePost, handleAddFavorite };
};
export default usePost;
