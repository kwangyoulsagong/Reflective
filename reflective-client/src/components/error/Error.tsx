import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from "../../constants/api";

import { AlertCircle } from "lucide-react";
export interface ErrorProps {
  statusCode?: number; // HTTP 상태 코드 (기본값: 404)
  resetError?: () => void; // 에러를 초기화하는 함수
}

const Error = ({
  statusCode = HTTP_STATUS_CODE.NOT_FOUND,
  resetError,
}: ErrorProps) => {
  const currentStatusCode =
    statusCode === HTTP_STATUS_CODE.CONTENT_TOO_LARGE
      ? HTTP_STATUS_CODE.BAD_REQUEST
      : statusCode;

  const statusCodeKey =
    currentStatusCode.toString() as unknown as keyof typeof HTTP_ERROR_MESSAGE;

  if (!(statusCodeKey in HTTP_ERROR_MESSAGE)) {
    return null; // 존재하지 않는 경우에는 null 반환
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-lg p-8 mx-4">
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 상단 장식 바 */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: "var(--primary-color)" }}
          />

          <div className="px-6 py-8">
            {/* 에러 아이콘 */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* 에러 코드 표시 */}
            <div className="text-center mb-4">
              <span
                className="inline-block px-4 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "#ffffff",
                }}
              >
                Error {currentStatusCode}
              </span>
            </div>

            {/* 에러 메시지 */}
            <h1
              className="text-2xl font-bold text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              {HTTP_ERROR_MESSAGE[statusCodeKey].HEADING}
            </h1>

            <p className="text-gray-600 text-center mb-6">
              {HTTP_ERROR_MESSAGE[statusCodeKey].BODY}
            </p>

            {/* 리셋 버튼 */}
            {resetError && (
              <div className="text-center">
                <button
                  onClick={resetError}
                  style={{ backgroundColor: "var(--primary-color)" }}
                  className="px-6 py-3 text-white rounded-lg hover:opacity-90 
                            transition-all duration-200 shadow-md hover:shadow-lg
                            focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {HTTP_ERROR_MESSAGE[statusCodeKey].BUTTON}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
