import { END_POINTS } from "../../shared/constants/api";
import { axiosInstance } from "../axiosinstance";

const deletePostFavorite = async (favorite_id: string) => {
  const { data } = await axiosInstance.delete(
    END_POINTS.DELETEFAVORITE(favorite_id)
  );
  return data;
};
export default deletePostFavorite;
