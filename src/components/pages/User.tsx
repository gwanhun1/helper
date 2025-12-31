import PageLayout from "../organisms/PageLayout";
import UserProfile from "../organisms/UserProfile";
import useUserStore from "../../store/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import UserAccount from "../organisms/UserAccount";
import UserNotice from "../organisms/UserNotice";
import RemainingQuotaCard from "../organisms/RemainingQuotaCard";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Text from "../atoms/Text";
import { Link } from "react-router-dom";
import { FiPieChart, FiArrowRight, FiCreditCard } from "react-icons/fi";

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

  return (
    <PageLayout requireAuth>
      <div className="pb-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserProfile
            photoURL={user?.photoURL}
            email={user?.email}
            displayName={user?.displayName}
            onLogout={handleLogOut}
          />
        </motion.div>
      </div>

      <div className="px-4 -mt-4 mb-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Link
            to="/insight"
            className="flex items-center justify-between p-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[35px] shadow-2xl shadow-green/10 text-slate-800 group overflow-hidden relative active:scale-95 transition-all"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
              <FiPieChart size={100} className="text-green" />
            </div>

            <div className="flex relative z-10 items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-white to-green/10 rounded-2xl flex items-center justify-center text-green shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_8px_16px_rgba(122,196,167,0.1)] border border-white/60">
                <FiPieChart size={28} />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center">
                  <span className="text-xl font-black tracking-tight transition-colors text-slate-800 group-hover:text-green">
                    나의 마음 리포트
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-green text-white shadow-md shadow-green/20">
                    NEW
                  </span>
                </div>
                <span className="text-slate-500 text-[13px] font-medium tracking-tight">
                  AI가 분석한 감정 통계와 인사이트
                </span>
              </div>
            </div>

            <div className="flex relative z-10 justify-center items-center w-10 h-10 rounded-full transition-all bg-slate-900/5 group-hover:bg-green group-hover:text-white">
              <FiArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <UserAccount email={user?.email} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <Link
            to="/credit"
            className="flex items-center justify-between p-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[35px] shadow-2xl shadow-blue-500/10 text-slate-800 group overflow-hidden relative active:scale-95 transition-all"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
              <FiCreditCard size={100} className="text-blue-500" />
            </div>

            <div className="flex relative z-10 items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-white to-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_8px_16px_rgba(59,130,246,0.1)] border border-white/60">
                <FiCreditCard size={28} />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center">
                  <span className="text-xl font-black tracking-tight transition-colors text-slate-800 group-hover:text-blue-500">
                    포인트 충전
                  </span>
                </div>
                <span className="text-slate-500 text-[13px] font-medium tracking-tight">
                  더 많은 상담을 위한 포인트 충전
                </span>
              </div>
            </div>

            <div className="flex relative z-10 justify-center items-center w-10 h-10 rounded-full transition-all bg-slate-900/5 group-hover:bg-blue-500 group-hover:text-white">
              <FiArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <RemainingQuotaCard
            count={user?.count}
            total={10}
            lastResetDate={user?.lastResetDate}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UserNotice />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default User;
