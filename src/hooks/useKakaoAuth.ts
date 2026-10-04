import { useCallback } from "react";
import { OAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { loginDestination } from "../utils/auth";
export const useKakaoAuth = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = useCallback(async (code: string, state: string) => {
    const response = await fetch("/api/kakao", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, state }), signal: AbortSignal.timeout(20000) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "로그인하지 못했어요.");
    const credential = new OAuthProvider("oidc.kakao").credential({ idToken: result.idToken });
    await signInWithCredential(auth, credential);
    const destination = loginDestination();
    sessionStorage.removeItem("login-return");
    navigate(destination, { replace: true });
  }, [navigate]);
  return { handleKakaoLogin };
};
