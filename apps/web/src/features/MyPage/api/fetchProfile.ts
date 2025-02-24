import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const fetchProfile = async () => {
  try {
    const [profileResponse, favoriteResponse] = await Promise.all([
      axiosInstance.get(END_POINTS.MYPROFILE),
      axiosInstance.get(E),
    ]);
  } catch (error) {}
};
export default fetchProfile;
