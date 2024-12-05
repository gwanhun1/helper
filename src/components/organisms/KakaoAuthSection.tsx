import { useEffect } from "react";
import { useKakaoAuth } from "../../hooks/useKakaoAuth";
import Loading from "../atoms/Loading";

const KakaoAuthSection = () => {
  const { handleKakaoLogin } = useKakaoAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      handleKakaoLogin(code);
    }
  }, [handleKakaoLogin]);

  return <Loading />;
};

export default KakaoAuthSection;
