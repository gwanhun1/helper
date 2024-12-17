import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import Chatbot from "../components/pages/Chatbot";
import User from "../components/pages/User";
import Worry from "../components/pages/Worry";
import Credit from "../components/pages/Credit";
import KakaoAuthSection from "../components/organisms/KakaoAuthSection";
import Auth from "../components/pages/Auth";
import AuthGuard from "../components/pages/AuthGuard";
import Error from "../components/pages/Error";
import Advice from "../components/pages/Advice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: (
          <AuthGuard>
            <User />
          </AuthGuard>
        ),
      },
      {
        path: "/worry",
        element: (
          <AuthGuard>
            <Worry />
          </AuthGuard>
        ),
      },
      {
        path: "/credit",
        element: <Credit />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/test",
        element: <Chatbot />,
      },
      {
        path: "/advice",
        element: (
          <AuthGuard>
            <Advice />
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
