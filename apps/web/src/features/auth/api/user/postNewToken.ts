import { axiosInstance } from "../../../../shared/api/axiosinstance";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
} from "../../../../shared/constants/api";

// 새 토큰 반환
async function postNewToken() {
  const requestData = {
    user_id: localStorage.getItem(USER_ID_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
  const response = await axiosInstance.post(
    "/api/v1/auth/refresh",
    requestData
  );
  const { accessToken } = response.data;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  return { accessToken };
}
export default postNewToken;
