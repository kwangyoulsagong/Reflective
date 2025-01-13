import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  checkAndSetToken,
  handleAPIError,
  handleTokenError,
} from "./interceptors";
import { AXIOS_BASE_URL, HTTP_STATUS_CODE, NETWORK } from "../constants/api";
import { HTTPError } from "./HTTPError";
import type { ErrorResponse } from "./interceptors";

export const axiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
  timeout: NETWORK.TIMEOUT,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => checkAndSetToken(config),
  () => {
    throw new HTTPError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "요청 처리 중 에러가 발생했습니다"
    );
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    try {
      // 토큰 에러 처리
      if (error.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        const updatedConfig = await handleTokenError(error);
        if (!updatedConfig) {
          throw new HTTPError(
            HTTP_STATUS_CODE.UNAUTHORIZED,
            "인증에 실패했습니다"
          );
        }
        // 토큰이 갱신된 경우 요청 재시도
        return await axiosInstance(updatedConfig);
      }
      // 일반 API 에러 처리
      return handleAPIError(error);
    } catch (handledError) {
      // ErrorBoundary로 전파되도록 동기적으로 에러를 던짐
      if (handledError instanceof Error) {
        throw handledError;
      }
      throw new HTTPError(
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "알 수 없는 에러가 발생했습니다"
      );
    }
  }
);
