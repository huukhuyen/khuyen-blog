import type { ErrorInfo, PropsWithChildren, ReactNode } from "react";
import { Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Chặn lỗi render để một bài viết lỗi không làm trắng cả trang.
 * Bắt buộc dùng class component vì React chưa có hook tương đương.
 */
export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Lỗi không xử lý được:", error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="error-screen">
        <div>
          <h1>Đã có lỗi xảy ra</h1>
          <p>Xin lỗi vì sự bất tiện. Bạn thử tải lại trang nhé.</p>
          <button onClick={() => window.location.reload()} type="button">
            Tải lại trang
          </button>
        </div>
      </main>
    );
  }
}
