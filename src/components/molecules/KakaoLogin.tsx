export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_REST_API_KEY
}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

function KakaoLogin() {
  return (
    <button type="button">
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
    </button>
  );
}

export default KakaoLogin;
