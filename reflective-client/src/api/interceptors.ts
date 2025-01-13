import {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import * as Sentry from "@sentry/react";
import { ACCESS_TOKEN_KEY, HTTP_STATUS_CODE } from "../constants/api";
import { HTTPError } from "./HTTPError";

export interface ErrorResponse {
  statusCode?: number;
  message?: string;
  code?: number;
}

export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
  // headers가 없으면 새로운 AxiosRequestHeaders 객체 생성
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }

  if (config.headers["Skip-Auth"] || config.headers.Authorization) {
    return config;
  }

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    if (window.location.pathname !== "/") {
      throw new HTTPError(HTTP_STATUS_CODE.UNAUTHORIZED, "인증이 필요합니다");
    }
    return config;
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  if (!error.response || !error.config) {
    throw new HTTPError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "서버와의 통신 중 오류가 발생했습니다"
    );
  }

  const { status, data } = error.response;

  // Sentry에 에러 로깅
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", data);
    scope.setExtra("url", window.location.href);
    Sentry.captureMessage(`[TokenError] ${status}: ${data.message}`);
  });

  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const { accessToken } = await response.json();
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      if (error.config.headers) {
        error.config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return error.config;
    } catch (refreshError) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      throw new HTTPError(status, "인증이 만료되었습니다. 다시 로그인해주세요");
    }
  }

  throw new HTTPError(status, data.message, data.code);
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) {
    throw new HTTPError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "네트워크 연결에 실패했습니다"
    );
  }

  const { status, data } = error.response;

  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", data);
    scope.setExtra("url", window.location.href);
    Sentry.captureMessage(`[APIError] ${status}: ${data.message}`);
  });

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "서버 오류가 발생했습니다"
    );
  }

  throw new HTTPError(status, data.message, data.code);
};
