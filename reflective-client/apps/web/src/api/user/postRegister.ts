import { END_POINTS } from "../../constants/api";
import { axiosInstance } from "../axiosinstance";

export const postRegister = async (body: object) => {
  const response = await axiosInstance.post(END_POINTS.REIGISTER, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return response.data;
};
