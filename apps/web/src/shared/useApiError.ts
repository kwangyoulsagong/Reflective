import { useToast } from "@repo/ui/usetoast";
import { HTTP_STATUS_CODE } from "./constants/api";
import { HTTPError } from "./api/HTTPError";
export const useApiError = () => {
  const { showToast } = useToast();
  const handleError = (error: unknown) => {
    if (error instanceof HTTPError) {
      if (
        error.statusCode === HTTP_STATUS_CODE.UNAUTHORIZED ||
        error.statusCode === HTTP_STATUS_CODE.NOT_FOUND ||
        error.statusCode >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      ) {
        throw error;
      }
      showToast(error.message || "오류가 발생했습니다", "error");
      return;
    }
    if (error instanceof Error) {
      showToast(error.message || "error");
    } else {
      showToast("알수 없는 오류 발생", "error");
    }
  };

  return { handleError };
};
