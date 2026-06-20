import PageLayout from "../organisms/PageLayout";
import useUserStore from "../../store/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import UserNotice from "../organisms/UserNotice";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiPieChart, FiArrowRight, FiCreditCard, FiLogOut } from "react-icons/fi";
import ProfileImage from "../atoms/ProfileImage";
import Badge from "../atoms/Badge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" },
});

const User = () => {
  const user = useUserStore((state) => state.user);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      toast.success("로그아웃되었습니다");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
      toast.error("로그아웃 중 문제가 발생했습니다");
    }
  };

  const count = user?.count ?? 0;
  const total = 10;
  const percentage = Math.round((count / total) * 100);

  return (
    <PageLayout requireAuth>
      {/* 히어로 헤더 */}
      <motion.div
        {...fadeUp(0)}
        className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-6 pt-8 pb-10"
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-teal-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <ProfileImage
              size={72}
              src={user?.photoURL ?? undefined}
              className="rounded-2xl border-2 border-white shadow-lg"
            />
            <Badge variant="default" className="absolute -top-1.5 -right-1.5 shadow">
              일반
            </Badge>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-extrabold text-slate-800 truncate">
              {user?.displayName || "사용자"}
            </p>
            <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
              {user?.email || "이메일 없음"}
            </p>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 border border-slate-100 text-slate-400 text-xs font-semibold hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all"
          >
            <FiLogOut size={13} />
            로그아웃
          </button>
        </div>

        {/* 남은 상담 쿼터 인라인 */}
        <div className="relative mt-6 bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">남은 상담 기회</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-slate-800">{count}</span>
                <span className="text-sm font-semibold text-slate-400">/ {total}회</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-500">{percentage}%</span>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">남음</p>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
            />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2">
            매일 자정 자동 충전 · 최근 갱신: {user?.lastResetDate || "—"}
          </p>
        </div>
      </motion.div>

      {/* 바로가기 카드 */}
      <div className="px-4 pt-4 space-y-3">
        <motion.div {...fadeUp(0.1)}>
          <Link
            to="/insight"
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all group"
          >
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
              <FiPieChart size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-slate-800">나의 마음 리포트</span>
                <span className="px-1.5 py-0.5 text-[9px] font-black rounded-full bg-emerald-500 text-white">NEW</span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">AI가 분석한 감정 통계와 인사이트</p>
            </div>
            <FiArrowRight size={16} className="text-slate-300 group-hover:text-emerald-400 transition-colors shrink-0" />
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.15)}>
          <Link
            to="/credit"
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all group"
          >
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
              <FiCreditCard size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[15px] font-bold text-slate-800">포인트 충전</span>
              <p className="text-xs text-slate-400 font-medium mt-0.5">더 많은 상담을 위한 포인트 충전</p>
            </div>
            <FiArrowRight size={16} className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
          </Link>
        </motion.div>

        {/* 계정 정보 */}
        <motion.div {...fadeUp(0.2)}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <p className="px-4 pt-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">계정</p>
            <div className="px-4 py-3 border-t border-slate-50 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 w-16 shrink-0">이메일</span>
              <span className="text-xs text-slate-700 font-medium truncate">{user?.email || "이메일 없음"}</span>
            </div>
            <div className="px-4 py-3 border-t border-slate-50 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 w-16 shrink-0">결제수단</span>
              <span className="text-xs text-slate-400 font-medium">등록된 결제 수단 없음</span>
            </div>
          </div>
        </motion.div>

        {/* 공지 / FAQ / 버전 */}
        <motion.div {...fadeUp(0.25)} className="pb-6">
          <UserNotice />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default User;
