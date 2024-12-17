import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
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
