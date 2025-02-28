import { axiosInstance } from "../axiosinstance";
import { END_POINTS } from "../../constants/api";

const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await axiosInstance.get(END_POINTS.RECENTPOST, {
    params: {
      page: pageParam,
      limit: 30,
    },
    headers: {
      "Skip-Auth": true,
    },
  });
  return data;
};
export default fetchPosts;
