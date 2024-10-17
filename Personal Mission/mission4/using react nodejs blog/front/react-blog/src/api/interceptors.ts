import * as Sentry from "@sentry/react";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosinstance";
import {
  ACCESS_TOKEN_KEY,
  ERROR_CODE,
  HTTP_STATUS_CODE,
} from "../constants/api";

// 에러 응답 타입
export interface ErrorResponse {
  statusCode: number;
  message: string;
  code: number;
}

export const checkAndSetToken = (config: InternalAxiosRequestConfig) => {
  if (!config.headers || config.headers.Authorization) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
};
