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

// 요청 인터셉터: 토큰 설정 및 API 오류 처리
axiosInstance.interceptors.request.use(checkAndSetToken, handleAPIError);

// 응답 인터셉터: 401 오류가 발생하면 토큰 갱신 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답을 그대로 반환
  handleTokenError // 토큰 오류 처리 (401 Unauthorized 처리)
);
