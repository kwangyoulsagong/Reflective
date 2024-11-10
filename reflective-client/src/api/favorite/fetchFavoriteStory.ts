import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

const fetchFavoriteStory = async () => {
  const { data } = await axiosInstance.get(END_POINTS.SAVEFAVORITE);
  return data;
};
export default fetchFavoriteStory;
