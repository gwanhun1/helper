import { useEffect } from "react";
import { getAuth, OAuthProvider, signInWithCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser); // setUser 액션 가져오기

  useEffect(() => {
    // URL에서 authorization code 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // 2. 카카오 서버에 access token 요청
      fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code: code, // URL에서 가져온 code
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const accessToken = data.access_token; // 카카오의 access token

          if (accessToken) {
            // 3. Firebase Authentication에 연동
            const auth = getAuth();
            const provider = new OAuthProvider("kakao.com");

            // Firebase에 카카오 access token을 사용하여 로그인
            signInWithCredential(auth, provider.credential({ accessToken }))
              .then((result) => {
                const user = result.user;
                alert("환영합니다!🎉");

                // Firebase 로그인 성공 후, 사용자 정보를 Zustand 상태에 저장
                setUser({
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                });

                // 로그인 후 홈 페이지로 리디렉션
                navigate("/home");
              })
              .catch((error) => {
                alert("로그인에 실패하셨습니다.😭");
                console.error("Firebase 로그인 실패:", error);
                navigate("/auth");
              });
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
        });
    }
  }, [navigate, setUser]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoAuth;
