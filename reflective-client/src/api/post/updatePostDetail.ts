import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

export interface UpdateState {
  post_id: string;
  body: object;
}

const updatePostDetail = async ({ body, post_id }: UpdateState) => {
  const { data } = await axiosInstance.put(END_POINTS.POST(post_id), body);
  return data;
};

export default updatePostDetail;
