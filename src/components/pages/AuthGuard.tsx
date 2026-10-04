import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { rememberDestination } from "../../utils/auth";
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, authReady } = useUserStore();
  const location = useLocation();
  if (!authReady) return <div role="status" className="h-full flex items-center justify-center text-slate-600">로그인을 확인하고 있어요</div>;
  if (!user) { rememberDestination(location.pathname + location.search); return <Navigate to="/auth" replace />; }
  return <div className="h-full min-h-0">{children}</div>;
};
export default AuthGuard;
