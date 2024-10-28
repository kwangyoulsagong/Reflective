import * as Sentry from "@sentry/react";
import type { ComponentType, PropsWithChildren } from "react";
import { Component } from "react";
import type { ErrorProps } from "../../components/error/Error";
import { HTTPError } from "../../api/HTTPError";
import { ERROR_CODE } from "../../constants/api";

// Define error code keys
type ErrorCodeKey = keyof typeof ERROR_CODE;

/**
 * ErrorBoundary 컴포넌트의 props 인터페이스
 * @property {ComponentType<ErrorProps>} Fallback - 에러 발생시 보여줄 컴포넌트
 * @property {Function} onReset - 에러 초기화 시 실행될 콜백 함수
 */
interface ErrorBoundaryProps {
  Fallback: ComponentType<ErrorProps>;
  onReset?: (error: ErrorType) => void;
}

/**
 * ErrorBoundary의 state 인터페이스
 * @property {boolean} hasError - 에러 발생 여부
 * @property {ErrorType | null} error - 발생한 에러 객체
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorType | null;
}

// 타입 alias를 통한 에러 타입 정의
type ErrorType = Error | HTTPError;

/**
 * 초기 상태 값
 */
const INITIAL_STATE: ErrorBoundaryState = {
  hasError: false,
  error: null,
};

/**
 * 애플리케이션의 에러를 캡처하고 처리하는 ErrorBoundary 컴포넌트
 * 자식 컴포넌트에서 발생하는 에러를 캐치하여 Fallback UI를 표시합니다.
 */
class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = INITIAL_STATE;

  static getDerivedStateFromError(error: ErrorType): ErrorBoundaryState {
    return { hasError: true, error };
  }

  private captureError = (error: ErrorType): void => {
    Sentry.withScope((scope) => {
      scope.setLevel("error");
      scope.setExtra("location", window.location.href);
      scope.setExtra("errorType", error.name);
      Sentry.captureMessage(`[${error.name}] ${window.location.href}`);
    });
  };

  componentDidCatch(error: ErrorType): void {
    this.captureError(error);
  }

  private resetErrorBoundary = (): void => {
    const { onReset } = this.props;
    const { error } = this.state;

    if (error && onReset) {
      onReset(error);
    }

    this.setState(INITIAL_STATE);
  };

  private getErrorDetails = (error: ErrorType) => {
    if (error instanceof HTTPError) {
      return {
        statusCode: error.statusCode,
        errorCode: this.getErrorCodeKey(error.code), //에러코드
      };
    }
    return {
      statusCode: undefined,
      errorCode: undefined,
    };
  };

  private getErrorCodeKey(code: number | undefined): ErrorCodeKey | undefined {
    if (code === undefined) return undefined;
    const entry = Object.entries(ERROR_CODE).find(
      ([, value]) => value === code
    );
    return entry ? (entry[0] as ErrorCodeKey) : undefined;
  }

  render() {
    const { Fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      const errorDetails = this.getErrorDetails(error);

      return (
        <Fallback {...errorDetails} resetError={this.resetErrorBoundary} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
