import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <div className="h-full">{children}</div>;
};

export default AuthGuard;
