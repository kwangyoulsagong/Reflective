import * as Sentry from "@sentry/react";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosinstance";
import {
  ACCESS_TOKEN_KEY,
  ERROR_CODE,
  HTTP_STATUS_CODE,
} from "../constants/api";
import postNewToken from "./user/postNewToken";
import { HTTPError } from "./HTTPError";

// 에러 응답 타입
export interface ErrorResponse {
  statusCode?: number;
  message?: string;
  code?: number;
}

// 토큰 체크 및 토큰 저장
export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
  if (!config.headers || config.headers.Authorization) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    window.location.href = "/";
    throw new Error("토큰이 유효하지 않습니다");
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    Sentry.captureMessage(
      `[TokenError] ${window.location.href} \n ${error.response?.data}`
    );
  });
  const originalRequest = error.config;
  if (!error.response || !originalRequest)
    throw new Error("에러 발생했습니다.");
  const { data, status } = error.response;
  if (
    status == HTTP_STATUS_CODE.BAD_REQUEST &&
    data.code === ERROR_CODE.EXPIRED_ACCESS_TOKEN
  ) {
    const { accessToken } = await postNewToken();
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return axiosInstance(originalRequest);
  }
  if (
    status === HTTP_STATUS_CODE.BAD_REQUEST &&
    (data.code === ERROR_CODE.INVALID_ACCESS_TOKEN ||
      data.code === ERROR_CODE.INVALID_REFRESH_TOKEN ||
      data.code === ERROR_CODE.EXPIRED_REFRESH_TOKEN ||
      data.code === ERROR_CODE.INVALID_TOKEN_VALIDATE ||
      data.code === ERROR_CODE.NULL_REFRESH_TOKEN ||
      data.code === ERROR_CODE.UNEXPECTED_TOKEN_ERROR ||
      data.code === ERROR_CODE.UNAUTHORIZED ||
      data.code === ERROR_CODE.INVALID_ACCESS_TOKEN)
  ) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    throw new HTTPError(status, data.message, data.code);
  }
  throw error;
};
export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    Sentry.captureMessage(
      `[APIError] ${window.location.href} \n ${error.response?.data}`
    );
  });
  if (!error.response) throw error;
  const { data, status } = error.response;
  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }
  throw new HTTPError(status, data.message, data.code);
};
