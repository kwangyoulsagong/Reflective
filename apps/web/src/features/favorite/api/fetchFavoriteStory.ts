import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchFavoriteStory = async () => {
  const { data } = await axiosInstance.get(END_POINTS.SAVEFAVORITE);
  return data;
};
export default fetchFavoriteStory;
