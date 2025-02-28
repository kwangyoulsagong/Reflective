import { axiosInstance } from "../../../shared/api/axiosinstance";
import { END_POINTS } from "../../../shared/constants/api";

const uploadThumbnail = async (formData: any) => {
  try {
    const { data } = await axiosInstance.post(
      END_POINTS.UPLOADTHUMBNAIL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("섭네일 업로드 오류", error);
  }
};
export default uploadThumbnail;
