import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import KakaoAuthSection from "../components/organisms/KakaoAuthSection";
import AuthGuard from "../components/pages/AuthGuard";
import Error from "../components/pages/Error";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../hooks/useErrorBoundary";
import Loading from "../components/atoms/Loading";

const HomePage = lazy(() => import("../components/pages/Home"));
const UserPage = lazy(() => import("../components/pages/User"));
const WorryPage = lazy(() => import("../components/pages/Worry"));
const CreditPage = lazy(() => import("../components/pages/Credit"));
const AuthPage = lazy(() => import("../components/pages/Auth"));
const AdvicePage = lazy(() => import("../components/pages/Advice"));

const LoadingSection = () => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Loading />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSection />}>
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<LoadingSection />}>
            <AuthGuard>
              <ErrorBoundary>
                <UserPage />
              </ErrorBoundary>
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "/worry",
        element: (
          <Suspense fallback={<LoadingSection />}>
            <AuthGuard>
              <ErrorBoundary>
                <WorryPage />
              </ErrorBoundary>
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "/credit",
        element: (
          <Suspense fallback={<LoadingSection />}>
            <CreditPage />
          </Suspense>
        ),
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<LoadingSection />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "/advice",
        element: (
          <Suspense fallback={<LoadingSection />}>
            <AuthGuard>
              <ErrorBoundary>
                <AdvicePage />
              </ErrorBoundary>
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "/auth/kakao/callback",
        element: <KakaoAuthSection />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
