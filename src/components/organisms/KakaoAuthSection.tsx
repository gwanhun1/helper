import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useKakaoAuth } from "../../hooks/useKakaoAuth";
import Loading from "../atoms/Loading";
const KakaoAuthSection = () => {
  const { handleKakaoLogin } = useKakaoAuth();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code"); const state = params.get("state");
    if (!code || !state) { setError("로그인이 취소되었거나 요청이 만료되었어요."); return; }
    void handleKakaoLogin(code, state).catch(cause => setError(cause instanceof Error ? cause.message : "로그인하지 못했어요."));
  }, [handleKakaoLogin]);
  return <div className="h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
    {error ? <><p role="alert" className="text-slate-700">{error}</p><Link to="/auth" className="rounded-xl bg-emerald-700 text-white px-5 py-3">다시 로그인하기</Link><Link to="/">홈으로 돌아가기</Link></> : <><Loading className="h-32" /><p role="status">로그인을 확인하고 있어요</p></>}
  </div>;
};
export default KakaoAuthSection;
