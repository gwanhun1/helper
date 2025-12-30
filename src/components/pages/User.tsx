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
import { FiPieChart, FiArrowRight } from "react-icons/fi";

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
        {/* Insight Report Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Link
            to="/insight"
            className="flex items-center justify-between p-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[35px] shadow-2xl shadow-green/10 text-slate-800 group overflow-hidden relative active:scale-95 transition-all"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
              <FiPieChart size={100} className="text-green" />
            </div>

            <div className="relative z-10 flex items-center space-x-5">
              <div className="w-14 h-14 bg-green/10 rounded-2xl flex items-center justify-center text-green group-hover:bg-green group-hover:text-white transition-all duration-300">
                <FiPieChart size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight">
                  나의 마음 리포트
                </span>
                <span className="text-gray-500 text-xs font-medium">
                  AI가 심층 분석한 감정 통계
                </span>
              </div>
            </div>

            <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900/5 flex items-center justify-center group-hover:bg-green group-hover:text-white transition-all">
              <FiArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
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
