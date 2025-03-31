import { axiosInstance } from "./axiosinstance";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
  HTTP_STATUS_CODE,
} from "../constants/api";
import { HTTPError } from "./HTTPError";

// 새 토큰 반환
async function postNewToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const user_id = localStorage.getItem(USER_ID_KEY);

  console.log("토큰 갱신 시도:", {
    user_id,
    refreshTokenExists: !!refreshToken,
  });

  // 리프레시 토큰이 없으면 오류 발생
  if (!refreshToken) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    console.error("리프레시 토큰 없음");
    throw new HTTPError(
      HTTP_STATUS_CODE.UNAUTHORIZED,
      "인증 정보가 없습니다. 다시 로그인해주세요."
    );
  }

  try {
    console.log("토큰 갱신 요청 전송");
    const response = await axiosInstance.post("/api/v1/auth/refresh", {
      refreshToken,
      user_id,
    });

    console.log("토큰 갱신 성공:", response.status);
    const { accessToken } = response.data;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    return { accessToken };
  } catch (error: any) {
    console.error("토큰 갱신 실패:", error);

    // 응답이 있는 경우 자세한 오류 정보 로깅
    if (error.response) {
      console.error("오류 상태:", error.response.status);
      console.error("오류 데이터:", error.response.data);
    }

    // 리프레시 토큰 만료 또는 무효 처리
    if (
      error.response &&
      (error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED ||
        error.response.status === HTTP_STATUS_CODE.FORBIDDEN)
    ) {
      // 모든 인증 관련 데이터 제거
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);

      // 에러 메시지 구성
      const errorMessage =
        error.response.data?.message ||
        "인증이 만료되었습니다. 다시 로그인해주세요.";
      const errorCode = error.response.data?.code;

      throw new HTTPError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        errorMessage,
        errorCode
      );
    }

    // 그 외 오류는 그대로 전파
    throw error;
  }
}

export default postNewToken;
