import { useEffect } from "react";
import {
  getAuth,
  OAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { app } from "../../firebaseConfig";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const updateUserDatabase = async (user: User) => {
    const db = getDatabase(app);
    const dataRef = ref(db, `users/${user.uid}`);
    console.log(user);

    await update(dataRef, {
      loginDate: new Date().toLocaleDateString(),
      password: "kakao",
      id: user.displayName || "kakao_" + user.uid,
      photoURL: user.photoURL,
      grade: "",
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      return;
    }

    console.log("Received Kakao Code:", code);

    // 카카오 API로 access_token을 요청
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        client_secret: import.meta.env.VITE_KAKAO_SECRET_KEY,
        code: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Kakao Token Response:", data);

        if (data.access_token) {
          const auth = getAuth();
          const provider = new OAuthProvider("oidc.kakao");

          const credential = provider.credential({
            idToken: data.id_token,
            accessToken: data.access_token,
          });

          signInWithCredential(auth, credential)
            .then(async (result) => {
              const user = result.user;
              alert("환영합니다!🎉");

              // Update user store
              setUser({
                uid: user.uid,
                displayName: user.displayName || "이름 없음",
                email: user.email || "이메일 없음",
                photoURL:
                  user.photoURL || "https://example.com/default-avatar.jpg",
              });

              // Update database
              await updateUserDatabase(user);

              navigate("/");
            })
            .catch((error) => {
              console.error("로그인 실패:", error.code, error.message);

              if (error.code === "auth/user-not-found") {
                const userEmail = data.kakao_account.email;
                const userPassword = `KakaoUser_${Math.random()
                  .toString(36)
                  .substring(7)}`;

                createUserWithEmailAndPassword(auth, userEmail, userPassword)
                  .then(async (userCredential) => {
                    const user = userCredential.user;
                    alert("회원가입 완료! 🎉");

                    // Update user store
                    setUser({
                      uid: user.uid,
                      displayName: user.displayName || "이름 없음",
                      email: user.email || "이메일 없음",
                      photoURL:
                        user.photoURL ||
                        "https://example.com/default-avatar.jpg",
                    });

                    // Update database
                    await updateUserDatabase(user);

                    navigate("/");
                  })
                  .catch((signupError) => {
                    console.error("회원가입 실패:", signupError);
                    alert("회원가입에 실패했습니다.");
                  });
              } else {
                alert("로그인에 실패했습니다.");
              }
            });
        } else {
          console.error(
            "Access token이 없거나 잘못된 응답이 반환되었습니다:",
            data
          );
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.error("카카오 로그인 실패:", error);
        alert("카카오 로그인 요청 중 오류가 발생했습니다.");
      });
  }, [navigate, setUser]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoAuth;
