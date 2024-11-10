import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

const SavePost = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.SAVEPOST, body);
  return data;
};

export default SavePost;
