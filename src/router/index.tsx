// src/router/router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import Logs from "../components/pages/Logs";
import User from "../components/pages/User";
import Worry from "../components/pages/Worry";
import Credit from "../components/pages/Credit";
import KakaoAuth from "../components/molecules/KakaoAuth";
import Auth from "../components/pages/Auth";
import AuthGuard from "../components/pages/AuthGuard";
import Error from "../components/pages/Error";
import Meditation from "../components/pages/Meditation"; // Added import statement

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App을 루트 컴포넌트로 설정
    children: [
      {
        path: "/",
        element: <Home />, // Home 페이지는 인증 필요 없음
      },
      {
        path: "/Logs",
        element: (
          <AuthGuard>
            <Logs />
          </AuthGuard>
        ),
      },
      {
        path: "/User",
        element: (
          <AuthGuard>
            <User />
          </AuthGuard>
        ), // User 페이지는 인증 필요
      },
      {
        path: "/Worry",
        element: (
          <AuthGuard>
            <Worry />
          </AuthGuard>
        ), // Worry 페이지는 인증 필요
      },
      {
        path: "/Credit",
        element: (
          <AuthGuard>
            <Credit />
          </AuthGuard>
        ), // Credit 페이지는 인증 필요
      },
      {
        path: "/Meditation",
        element: <Meditation />, // Meditation 페이지는 인증 필요 없음
      },
      {
        path: "/auth",
        element: <Auth />, // 인증 페이지는 인증 필요 없음
      },
      {
        path: "/auth/kakao/callback",
        element: <KakaoAuth />, // 카카오 인증 콜백 페이지는 인증 필요 없음
      },
    ],
  },
  {
    path: "*",
    element: <Error />, // 모든 잘못된 경로는 Home 리디렉션
  },
]);

export default router;
