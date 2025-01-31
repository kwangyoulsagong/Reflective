import { END_POINTS } from "../../../../shared/constants/api";
import { axiosInstance } from "../../../../shared/api/axiosinstance";

export const postRegister = async (body: object) => {
  const response = await axiosInstance.post(END_POINTS.REIGISTER, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return response.data;
};
