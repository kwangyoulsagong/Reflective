import axios from "axios";

import {
  checkAndSetToken,
  handleAPIError,
  handleTokenError,
} from "./interceptors";

import { AXIOS_BASE_URL, NETWORK } from "../constants/api";
// Axios 인스턴스의 기본 URL을 설정합니다.
export const axiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
  timeout: NETWORK.TIMEOUT,
});

axiosInstance.interceptors.request.use(checkAndSetToken, handleAPIError);
axiosInstance.interceptors.request.use(
  (response) => response,
  handleTokenError
);
axiosInstance.interceptors.response.use((response) => response, handleAPIError);
