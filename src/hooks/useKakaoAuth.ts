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
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      grade: "",
      count: 3,
    });
  };

  const handleKakaoLogin = async (code: string) => {
    try {
      const response = await fetch(
        `https://kauth.kakao.com/oauth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_API_KEY,
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            code,
          }),
        }
      );

      const data = await response.json();

      if (data.access_token) {
        const userResponse = await fetch(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

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
          const auth = getAuth();
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              `${userData.id}@kakao.com`,
              `${userData.id}`
            );
            await updateUserDatabase(userCredential.user);
            navigate("/");
          } catch (createError) {
            console.error("Error creating user:", createError);
          }
        }
      }
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };

  return { handleKakaoLogin };
};
