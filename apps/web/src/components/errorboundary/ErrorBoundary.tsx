import * as Sentry from "@sentry/react";
import { Component, ComponentType, PropsWithChildren } from "react";
import { ErrorProps } from "../error/Error";
import { HTTPError } from "../../api/HTTPError";
import { HTTP_STATUS_CODE } from "../../shared/constants/api";

interface ErrorBoundaryProps {
  Fallback: ComponentType<ErrorProps>;
  onReset?: (error: ErrorType) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorType | null;
}

type ErrorType = Error | HTTPError;

const INITIAL_STATE: ErrorBoundaryState = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = INITIAL_STATE;

  static getDerivedStateFromError(error: ErrorType): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: ErrorType, errorInfo: React.ErrorInfo): void {
    // Sentry에 에러 정보 전송
    Sentry.withScope((scope) => {
      scope.setLevel("error");
      scope.setExtra("errorInfo", errorInfo);
      scope.setExtra("location", window.location.href);
      Sentry.captureException(error);
    });
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
        message: error.message,
        code: error.code,
      };
    }
    return {
      statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: error.message || "알 수 없는 에러가 발생했습니다",
    };
  };

  render() {
    const { hasError, error } = this.state;
    const { Fallback, children } = this.props;

    if (hasError && error) {
      const errorDetails = this.getErrorDetails(error);
      return (
        <Fallback {...errorDetails} resetError={this.resetErrorBoundary} />
      );
    }

    return children;
  }
}
export default ErrorBoundary;
