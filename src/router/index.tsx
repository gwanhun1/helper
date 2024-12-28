import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import KakaoAuthSection from "../components/organisms/KakaoAuthSection";
import AuthGuard from "../components/pages/AuthGuard";
import Error from "../components/pages/Error";
import ErrorBoundary from "../hooks/useErrorBoundary";
import Loading from "../components/atoms/Loading";
import HomePage from "../components/pages/Home";
import UserPage from "../components/pages/User";
import WorryPage from "../components/pages/Worry";
import CreditPage from "../components/pages/Credit";
import AuthPage from "../components/pages/Auth";
import AdvicePage from "../components/pages/Advice";

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
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: "/user",
        element: (
          <AuthGuard>
            <ErrorBoundary>
              <UserPage />
            </ErrorBoundary>
          </AuthGuard>
        ),
      },
      {
        path: "/worry",
        element: (
          <AuthGuard>
            <ErrorBoundary>
              <WorryPage />
            </ErrorBoundary>
          </AuthGuard>
        ),
      },
      {
        path: "/credit",
        element: <CreditPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/advice",
        element: (
          <AuthGuard>
            <ErrorBoundary>
              <AdvicePage />
            </ErrorBoundary>
          </AuthGuard>
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
