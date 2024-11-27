// AuthGuard.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom v6 이상에서는 useNavigate 사용
import useUserStore from "../../store/userStore";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUserStore((state) => state.user); // 상태에서 사용자 정보 가져오기
  const navigate = useNavigate(); // useNavigate 훅 사용

  React.useEffect(() => {
    if (!user) {
      // 사용자가 로그인되지 않았다면 '/auth' 페이지로 리다이렉트
      navigate("/auth");
    }
  }, [user, navigate]); // user가 바뀔 때마다 실행

  if (!user) {
    // user가 없으면 아무 것도 렌더링하지 않음
    return null;
  }

  return <>{children}</>; // 로그인된 사용자는 자식 컴포넌트 렌더링
};

export default AuthGuard;
