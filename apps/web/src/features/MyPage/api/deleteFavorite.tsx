import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const deleteFavorite = async (favorite_id: string) => {
  const { data } = await axiosInstance.delete(
    END_POINTS.DELETEFAVORITE(favorite_id)
  );
  return data;
};
export default deleteFavorite;
