import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // 선택적 커스텀 폴백 UI
}

interface State {
  hasError: boolean;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private readonly maxRetryCount = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    return {
      hasError: true,
      retryCount: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 에러 로깅
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Error Info:", errorInfo);
  }

  handleRetry = (): void => {
    this.setState((prevState) => ({
      hasError: false,
      retryCount: prevState.retryCount + 1,
    }));
  };

  componentDidUpdate(_: Props, prevState: State): void {
    if (
      this.state.retryCount >= this.maxRetryCount &&
      prevState.retryCount !== this.state.retryCount
    ) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 커스텀 폴백 UI가 제공된 경우 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 폴백 UI
      return (
        <div className="flex justify-center items-center h-[70vh] text-center">
          {this.state.retryCount < this.maxRetryCount ? (
            <div>
              <h2 className="font-ibm text-2xl font-semibold">
                문제가 발생했습니다.
              </h2>
              <p className="font-ibm mb-4">잠시 후 다시 시도해주세요.</p>
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                다시 시도
              </button>
            </div>
          ) : (
            <div>
              <h2 className="font-ibm text-2xl font-semibold">
                문제가 지속되고 있습니다.
              </h2>
              <p className="font-ibm">잠시 후 페이지가 새로고침됩니다...</p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
