import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const SavePost = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.SAVEPOST, body);
  return data;
};

export default SavePost;
