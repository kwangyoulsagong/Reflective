import { END_POINTS } from "../../../shared/constants/api";
import { axiosInstance } from "../../../shared/api/axiosinstance";

const postUploadProfileImage = async (formData: any) => {
  const { data } = await axiosInstance.post(
    END_POINTS.UPLOADPROFILEIMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
export default postUploadProfileImage;
