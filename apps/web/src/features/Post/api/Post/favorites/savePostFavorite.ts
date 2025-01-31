import { END_POINTS } from "../../../../../shared/constants/api";
import { axiosInstance } from "../../../../../shared/api/axiosinstance";

const savePostFavorite = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.SAVEFAVORITE, body);
  return data;
};
export default savePostFavorite;
