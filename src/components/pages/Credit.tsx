import { Link } from "react-router-dom";
const Credit = () => (
  <div className="h-full overflow-y-auto bg-emerald-50">
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800">상담 이용 안내</h1>
      <p className="mt-4 text-base text-slate-700 leading-relaxed">
        상담은 하루 10회 무료로 이용할 수 있어요. 한국 시간 오전 0시에 다음 날의
        이용 한도로 갱신돼요.
      </p>
      <p className="mt-3 text-sm text-slate-600">
        현재 유료 충전은 제공하지 않아요. 상담을 모두 사용한 날에도 감정 풀기와
        고민 나눔은 이용할 수 있어요.
      </p>
      <Link
        to="/vent"
        className="block mt-7 text-center bg-emerald-700 text-white py-4 rounded-xl font-semibold"
      >
        감정 풀기 이용하기
      </Link>
      <Link
        to="/worry"
        className="block mt-4 text-center text-emerald-800 underline"
      >
        내 마음의 숲으로 돌아가기
      </Link>
    </div>
  </div>
);
export default Credit;
