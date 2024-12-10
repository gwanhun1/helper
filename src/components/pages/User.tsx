import PageLayout from "../organisms/PageLayout";
import UserProfile from "../organisms/UserProfile";
import useUserStore from "../../store/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import UserAccount from "../organisms/UserAccount";
import UserNotice from "../organisms/UserNotice";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

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
    <PageLayout requireAuth className="bg-gray-50">
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
        <div className="p-4">
          <UserAccount />
          <UserNotice />
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default User;
