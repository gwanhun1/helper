import { RiKakaoTalkFill } from "react-icons/ri";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_REST_API_KEY
}&redirect_uri=${encodeURIComponent(
  import.meta.env.VITE_KAKAO_REDIRECT_URI
)}&response_type=code`;

function KakaoLogin() {
  return (
    <a
      href={KAKAO_AUTH_URL}
      className="flex items-center justify-center w-5/6 p-3 bg-yellow-300 rounded-lg"
    >
      <span className="text-sm font-bold text-gray-900">카카오로 시작하기</span>
      <RiKakaoTalkFill size={30} className="ml-2" />
    </a>
  );
}

export default KakaoLogin;
