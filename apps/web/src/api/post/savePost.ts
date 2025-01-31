import { END_POINTS } from "../../shared/constants/api";
import { axiosInstance } from "../axiosinstance";

const SavePost = async (body: object) => {
  console.log(body);
  const { data } = await axiosInstance.post(END_POINTS.SAVEPOST, body);
  return data;
};

export default SavePost;
