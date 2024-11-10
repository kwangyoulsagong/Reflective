import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

const savePostFavorite = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.SAVEFAVORITE, body);
  return data;
};
export default savePostFavorite;
