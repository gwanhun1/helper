/**
 * 카카오 OAuth redirect URI.
 *
 * 항상 현재 접속한 origin 기준으로 구성한다.
 * → 로컬은 http://localhost:5173/auth/kakao/callback,
 *   운영은 https://(www.)worryhelper.shop/auth/kakao/callback 로 자동 분리.
 * env 값에 의존하지 않으므로 dev/prod 혼선이 없다.
 *
 * 주의: 새 origin(예: localhost)에서 로그인하려면 카카오 개발자 콘솔의
 * "Redirect URI" 허용목록에 해당 주소를 등록해야 한다.
 */
export const KAKAO_REDIRECT_URI = `${window.location.origin}/auth/kakao/callback`;
