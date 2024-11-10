import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

const deletePostFavorite = async (favorite_id: string) => {
  const { data } = await axiosInstance.delete(
    END_POINTS.DELETEFAVORITE(favorite_id)
  );
  return data;
};
export default deletePostFavorite;
