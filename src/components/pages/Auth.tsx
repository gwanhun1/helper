import { Link } from "react-router-dom";
import KakaoLogin from "../molecules/KakaoLogin";
const Auth = () => (
  <div className="h-full overflow-y-auto bg-gradient-to-b from-emerald-50 to-white">
    <div className="max-w-md mx-auto px-6 py-10 md:py-16">
      <span aria-hidden="true" className="text-5xl">
        🌱
      </span>
      <h1 className="mt-6 text-2xl font-bold text-slate-800">
        나만의 마음 숲을 시작해요
      </h1>
      <p className="mt-3 text-base text-slate-600 leading-relaxed">
        카카오로 로그인하면 고민과 AI 조언을 비공개로 기록할 수 있어요.
      </p>
      <ul className="mt-7 space-y-3 text-sm text-slate-700">
        <li>🌳 한 번의 기록이 한 그루의 나무로</li>
        <li>🔒 나에게만 보이는 비공개 기록</li>
        <li>📊 직접 고른 기분의 변화 돌아보기</li>
      </ul>
      <div className="mt-8">
        <KakaoLogin />
      </div>
      <p className="mt-4 text-xs text-slate-600 leading-relaxed">
        하루 10회 무료 · 한국 시간 오전 0시에 이용 한도 갱신
        <br />
        공개 공유는 원할 때 직접 선택할 수 있어요.
      </p>
      <Link
        to="/guide"
        className="block mt-5 text-sm underline text-emerald-800"
      >
        이용 방법과 기록 안내
      </Link>
      <Link to="/" className="block mt-6 text-sm text-slate-600">
        홈으로 돌아가기
      </Link>
    </div>
  </div>
);
export default Auth;
