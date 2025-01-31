import { END_POINTS } from "../../../../shared/constants/api";
import { axiosInstance } from "../../../../api/axiosinstance";

export const postLogin = async (body: object) => {
  console.log(body);
  const response = await axiosInstance.post(END_POINTS.LOGIN, body, {
    headers: {
      "Skip-Auth": true, // 토큰 없이 요청을 보냄
    },
  });
  return response.data;
};
