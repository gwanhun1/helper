import { FiMessageCircle } from "react-icons/fi";

const AdviceBanner = () => {
  return (
    <div className="rounded-2xl p-4 border border-emerald-100 bg-emerald-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
          <FiMessageCircle className="text-white" size={20} />
        </div>
        <div>
          <h2 className="font-bold text-slate-800">오늘의 고민 공유하기</h2>
          <p className="text-sm text-slate-500">다른 사람들과 고민을 나눠보세요</p>
        </div>
      </div>
    </div>
  );
};

export default AdviceBanner;
