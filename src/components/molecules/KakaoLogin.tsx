import { RiKakaoTalkFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { rememberDestination } from "../../utils/auth";
export const KAKAO_AUTH_URL = "/api/kakao";
function KakaoLogin() {
  const location = useLocation();
  return <a href={KAKAO_AUTH_URL} onClick={() => { if (!location.pathname.startsWith("/auth")) rememberDestination(location.pathname + location.search); }} className="flex items-center justify-center gap-2 w-full py-4 bg-[#FEE500] rounded-2xl font-semibold text-slate-900"><RiKakaoTalkFill size={20} />카카오로 시작하기</a>;
}
export default KakaoLogin;
