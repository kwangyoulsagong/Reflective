import * as Sentry from "@sentry/react";
import { ACCESS_TOKEN_KEY, HTTP_STATUS_CODE } from "../constants/api";
import postNewToken from "./user/postNewToken";
import { HTTPError } from "./HTTPError";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosinstance";

// 에러 응답 타입 정의
export interface ErrorResponse {
  statusCode?: number;
  message?: string;
  code?: number;
}

// 요청 인터셉터에서 토큰을 설정하는 함수
export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
  // 토큰이 필요하지 않은 요청은 Authorization을 설정하지 않음
  if (config.headers?.["Skip-Auth"]) return config;

  // 이미 Authorization이 설정되어 있으면 그대로 반환
  if (!config.headers || config.headers.Authorization) return config;

  // 로컬 스토리지에서 토큰을 가져옵니다.
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  // 토큰이 없으면 로그인 페이지로 리디렉션
  if (!accessToken) {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
    throw new Error("토큰이 유효하지 않습니다");
  }

  // Authorization 헤더에 토큰을 설정
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// 토큰 오류 처리 및 재요청 함수
export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  const originalRequest = error.config;

  // 응답이나 originalRequest가 없으면 에러 처리
  if (!error.response || !originalRequest)
    throw new Error("에러 발생했습니다.");

  const { data, status } = error.response;

  // Sentry에 에러 정보를 기록
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", error.response?.data); // 에러 응답 정보 추가
    Sentry.captureMessage(
      `[TokenError] ${window.location.href} \n ${JSON.stringify(
        error.response?.data
      )}`
    );
  });

  // 401 Unauthorized 에러일 경우
  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    try {
      // 새로운 토큰을 발급받기 위해 postNewToken을 호출
      const { accessToken } = await postNewToken();

      // 발급받은 토큰을 Authorization 헤더에 추가
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // 원래 요청을 재시도
      return axiosInstance(originalRequest);
    } catch (err) {
      // 토큰 갱신 실패 시, 로컬 스토리지에서 토큰을 삭제하고 에러 처리
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      throw new HTTPError(status, data.message, data.code);
    }
  }

  // 401 외의 다른 오류가 발생한 경우는 그대로 에러를 throw
  throw error;
};

// API 에러 처리 함수
export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.setExtra("errorResponse", error.response?.data); // 에러 응답 정보 추가
    Sentry.captureMessage(
      `[APIError] ${window.location.href} \n ${JSON.stringify(
        error.response?.data
      )}`
    );
  });

  if (!error.response) throw error;

  const { data, status } = error.response;

  // 5xx 서버 에러는 HTTP 500으로 처리
  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }

  // 그 외의 클라이언트 에러는 그대로 상태와 메시지로 처리
  throw new HTTPError(status, data.message, data.code);
};
