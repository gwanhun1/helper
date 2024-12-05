import PageLayout from "../organisms/PageLayout";
import UserProfile from "../organisms/UserProfile";
import useUserStore from "../../store/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import UserAccount from "../organisms/UserAccount";
import UserNotice from "../organisms/UserNotice";

const User = () => {
  const user = useUserStore((state) => state.user);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return (
    <PageLayout requireAuth className="bg-gray-50">
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
    </PageLayout>
  );
};

export default User;
