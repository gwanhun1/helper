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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Link
            to="/insight"
            className="flex items-center justify-between p-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-lg shadow-green-100 text-white group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <FiPieChart size={60} />
            </div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <FiPieChart size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">나의 마음 리포트</span>
                <span className="text-white/80 text-xs">AI가 분석한 내 감정 통계 보기</span>
              </div>
            </div>
            <FiArrowRight size={24} className="relative z-10 opacity-60 group-hover:translate-x-1 transition-transform" />
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
            total={7}
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
