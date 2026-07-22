import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import { ErrorBoundary } from "./error-boundary";
import { PageLoader } from "./page-loader";
import { AppRoutes } from "./routes";
import { ScrollToTop } from "./scroll-to-top";

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
