import { Link } from "react-router-dom";
const Error = () => (
  <div className="h-full flex flex-col items-center justify-center gap-4 px-5 text-center">
    <h1 className="text-xl font-semibold text-slate-800">
      페이지를 찾을 수 없어요
    </h1>
    <p className="text-sm text-slate-600">
      주소를 확인하거나 홈에서 다시 시작해보세요.
    </p>
    <Link to="/" className="rounded-xl bg-emerald-700 text-white px-6 py-3">
      홈으로 돌아가기
    </Link>
  </div>
);
export default Error;
