import { END_POINTS } from "../../../../../shared/constants/api";
import { axiosInstance } from "../../../../../shared/api/axiosinstance";

const fetchPostFavorite = async (post_id: string) => {
  const { data } = await axiosInstance.get(END_POINTS.FAVORITE(post_id));
  return data;
};
export default fetchPostFavorite;
