import { useEffect } from "react";
import {
  getAuth,
  OAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { app } from "../../firebaseConfig";
import Loading from "../atoms/Loading";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update user store
        setUser({
          ...user,
          grade: "",
          count: 3,
          uid: user.uid,
          displayName: user.displayName || "이름 없음",
          email: user.email || "이메일 없음",
        });
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const updateUserDatabase = async (user: User) => {
    const db = getDatabase(app);
    const dataRef = ref(db, `users/${user.uid}`);

    await update(dataRef, {
      count: 3,
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
              alert("환영합니다! 🎉");

              // Update user store
              setUser({
                ...user,
                grade: "",
                count: 3,
                uid: user.uid,
                displayName: user.displayName || "이름 없음",
                email: user.email || "이메일 없음",
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
                      ...user,
                      grade: "",
                      count: 3,
                      uid: user.uid,
                      displayName: user.displayName || "이름 없음",
                      email: user.email || "이메일 없음",
                    });

                    // Update database
                    await updateUserDatabase(user);

                    navigate("/");
                  })
                  .catch((error) => {
                    console.error("회원가입 실패:", error.code, error.message);
                    alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
                  });
              }
            });
        }
      })
      .catch((error) => {
        console.error("카카오 인증 실패:", error);
        alert("카카오 인증 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  }, [navigate, setUser]);

  return <Loading />;
};

export default KakaoAuth;
