import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const putProfileInfo = async (body: object) => {
  const { data } = await axiosInstance.put(END_POINTS.PROFILE, body);
  return data;
};
export default putProfileInfo;
