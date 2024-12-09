import { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import Snackbar from "../atoms/Snackbar";

const AuthAlert = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      setShowSnackbar(true);
    }
  }, [user]);

  return (
    <Snackbar
      show={showSnackbar}
      message="로그인하고 더 많은 기능을 이용해보세요 ✨"
      onClose={() => setShowSnackbar(false)}
    />
  );
};

export default AuthAlert;
