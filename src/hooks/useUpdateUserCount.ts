import { ref, update, getDatabase } from "firebase/database";
import { app } from "../firebaseConfig";

const useUpdateUserCount = () => {
  const db = getDatabase(app);

  const decreaseUserCount = async (user: { uId?: string; count?: number }) => {
    if (!user || typeof user.count !== "number" || !user.uId) {
      throw new Error("Invalid user object");
    }
    console.log(user.count);
    console.log(user.uId);

    const dataUserRef = ref(db, `users/${user.uId}`);
    await update(dataUserRef, { count: user.count - 1 });
  };

  const updateUserCount = async (user: { uId?: string; count?: number }) => {
    if (!user || typeof user.count !== "number" || !user.uId) {
      throw new Error("Invalid user object");
    }
    const dataUserRef = ref(db, `users/${user.uId}`);
    await update(dataUserRef, { count: user.count });
  };

  return { decreaseUserCount, updateUserCount };
};

export default useUpdateUserCount;
