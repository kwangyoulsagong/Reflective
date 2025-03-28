import {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import * as Sentry from "@sentry/react";
import {
  ACCESS_TOKEN_KEY,
  HTTP_STATUS_CODE,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
} from "../constants/api";
import { HTTPError } from "./HTTPError";
import postNewToken from "./postNewToken";

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

  // 디버깅을 위한 로그 추가
  console.log("토큰 오류 발생:", status, data);

  // Sentry에 에러 로깅
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", data);
    scope.setExtra("url", window.location.href);
    scope.setExtra("statusCode", status);
    scope.setExtra("errorCode", data?.code);
    Sentry.captureMessage(
      `[TokenError] ${status}: ${data?.message || "Unknown error"}`
    );
  });

  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    // 리프레시 토큰 만료인지 확인
    const isRefreshTokenExpired =
      data?.message && data.message.includes("리프레쉬 토큰이 만료");

    // 리프레시 토큰 만료면 즉시 로그아웃 처리
    if (isRefreshTokenExpired) {
      console.log("리프레시 토큰 만료 감지, 로그아웃 처리");
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);

      // 로그인 페이지로 리디렉션 (현재 로그인 페이지가 아닌 경우)
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }

      throw new HTTPError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "인증이 만료되었습니다. 다시 로그인해주세요"
      );
    }

    // 액세스 토큰만 만료된 경우 토큰 갱신 시도
    try {
      console.log("액세스 토큰 만료, 갱신 시도");
      // 토큰 갱신 시도
      const { accessToken } = await postNewToken();

      if (error.config.headers) {
        error.config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return error.config;
    } catch (refreshError: any) {
      console.error("토큰 갱신 실패:", refreshError);

      // 모든 인증 데이터 제거
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);

      // 로그인 페이지로 리디렉션 (현재 로그인 페이지가 아닌 경우)
      if (window.location.pathname !== "/login") {
        alert("인증에 실패했습니다. 다시 로그인해주세요.");
        window.location.href = "/";
      }

      throw new HTTPError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "인증이 만료되었습니다. 다시 로그인해주세요"
      );
    }
  }

  // 그 외 오류는 그대로 전파
  throw new HTTPError(
    status,
    data?.message || "인증 오류가 발생했습니다",
    data?.code
  );
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
