import { END_POINTS } from "../../shared/constants/api";
import { axiosInstance } from "../axiosinstance";

const saveComment = async (body: object) => {
  const { data } = await axiosInstance.post(END_POINTS.SAVECOMMENT, body);
  return data;
};

export default saveComment;
