import { ref, update, getDatabase } from "firebase/database";
import { app } from "../firebaseConfig";

const useUpdateUserCount = () => {
  const db = getDatabase(app);

  const updateUserCount = async (user: { uId?: string; count?: number }) => {
    if (!user || typeof user.count !== "number" || !user.uId) {
      throw new Error("Invalid user object");
    }
    const dataUserRef = ref(db, `users/${user.uId}`);
    await update(dataUserRef, { count: user.count - 1 });
  };

  return { updateUserCount };
};

export default useUpdateUserCount;
