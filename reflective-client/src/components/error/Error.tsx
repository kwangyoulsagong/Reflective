import { HTTP_STATUS_CODE, HTTP_ERROR_MESSAGE } from "../../constants/api";

interface ErrorProps {
  statusCode?: number; // HTTP 상태 코드 (기본값: 404)
  resetError?: () => void; // 에러를 초기화하는 함수
}

const Error = ({
  statusCode = HTTP_STATUS_CODE.NOT_FOUND, // 상태 코드가 제공되지 않으면 기본값으로 404 사용
  resetError,
}: ErrorProps) => {
  const currentStatusCode =
    statusCode === HTTP_STATUS_CODE.CONTENT_TOO_LARGE
      ? HTTP_STATUS_CODE.BAD_REQUEST
      : statusCode;

  // currentStatusCode를 문자열로 변환 후, unknown으로 캐스팅
  const statusCodeKey =
    currentStatusCode.toString() as unknown as keyof typeof HTTP_ERROR_MESSAGE;

  // 해당 상태 코드에 대한 에러 메시지가 존재하지 않으면 null을 반환
  if (!(statusCodeKey in HTTP_ERROR_MESSAGE)) {
    return null; // 존재하지 않는 경우에는 null 반환
  }

  // 에러 메시지를 표시하는 JSX 반환
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center p-8 bg-white rounded-lg shadow-md">
        <img
          src="/error-image.svg" // 에러 이미지
          alt="에러 이미지" // 이미지 설명
          className="w-4/5 max-w-[300px] mx-auto mb-8"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          {HTTP_ERROR_MESSAGE[statusCodeKey].HEADING} // 상태 코드에 따른 헤딩
          메시지
        </h1>
        <p className="text-gray-600 mb-8">
          {HTTP_ERROR_MESSAGE[statusCodeKey].BODY} // 상태 코드에 따른 본문
          메시지
        </p>
        {resetError && (
          <button
            onClick={resetError} // 버튼 클릭 시 resetError 함수 호출
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
          >
            {HTTP_ERROR_MESSAGE[statusCodeKey].BUTTON} // 상태 코드에 따른 버튼
            메시지
          </button>
        )}
      </div>
    </div>
  );
};

// Error 컴포넌트 내보내기
export default Error;
