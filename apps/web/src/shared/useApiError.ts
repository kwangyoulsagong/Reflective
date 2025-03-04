import { useState } from "react";
import { HTTPError } from "./api/HTTPError";
import { HTTP_STATUS_CODE } from "./constants/api";
import { useToast } from "./Toast/Hooks/useToast";

export const useApiError = () => {
  const { showToast } = useToast();
  // 에러 상태를 관리할 상태 변수
  const [error, setError] = useState<Error | null>(null);

  // 에러가 설정되면 컴포넌트 렌더링 중에 에러를 던져서 ErrorBoundary가 캐치하도록 함
  if (error) {
    throw error; // 이 에러는 렌더링 중에 발생하므로 ErrorBoundary가 캐치함
  }

  const handleError = (error: unknown) => {
    console.log("Handling error:", error);

    if (error instanceof HTTPError) {
      if (
        error.statusCode === HTTP_STATUS_CODE.UNAUTHORIZED ||
        error.statusCode === HTTP_STATUS_CODE.NOT_FOUND ||
        error.statusCode >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      ) {
        // 상태를 업데이트하여 다음 렌더링에서 에러가 발생하도록 함
        setError(error);
        return;
      }

      showToast(error.message || "오류가 발생했습니다", "error");
      return;
    }

    // 다른 에러 타입 처리...
    if (error instanceof Error) {
      showToast(error.message || "오류가 발생했습니다", "error");
    } else if (typeof error === "string") {
      showToast(error, "error");
    } else if (error && typeof error === "object" && "message" in error) {
      showToast(
        typeof error.message === "string"
          ? error.message
          : "오류가 발생했습니다",
        "error"
      );
    } else {
      showToast("알 수 없는 오류가 발생했습니다", "error");
    }
  };

  return { handleError };
};
