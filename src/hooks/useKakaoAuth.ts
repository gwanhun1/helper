import { useEffect } from "react";
import {
  getAuth,
  OAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, update, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { app } from "../firebaseConfig";

export const useKakaoAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          ...user,
          grade: "",
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
    const snapshot = await get(dataRef);
    const existing = snapshot.val();
    const today = new Date().toISOString().slice(0, 10);
    const hasValidCount = typeof existing?.count === "number";
    const lastResetDate = existing?.lastResetDate as string | undefined;
    const needsReset = lastResetDate !== today;
    const nextCount = needsReset ? 10 : hasValidCount ? existing.count : 10;

    await update(dataRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      grade: "",
      lastResetDate: today,
      count: nextCount,
    });
  };

  const handleKakaoLogin = async (code: string) => {
    try {
      const response = await fetch(`https://kauth.kakao.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          client_secret: import.meta.env.VITE_KAKAO_SECRET_KEY,
          code,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });

        const userData = await userResponse.json();
        const auth = getAuth();
        const provider = new OAuthProvider("oidc.kakao");
        const credential = provider.credential({
          idToken: data.id_token,
        });

        try {
          const result = await signInWithCredential(auth, credential);

          if (result.user) {
            await updateUserDatabase(result.user);
            navigate("/");
          }
        } catch (error) {
          console.error("Firebase auth error:", error);
          alert(
            "카카오 로그인 인증에 실패했습니다. 잠시 후 다시 시도해 주세요.",
          );
        }
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      alert("로그인 중 오류가 발생했습니다. 네트워크 연결을 확인해 주세요.");
    }
  };

  return { handleKakaoLogin };
};
