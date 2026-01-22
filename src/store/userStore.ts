import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { getDatabase, ref, get, update } from "firebase/database";

interface ExtendedUser extends FirebaseUser {
  grade?: string;
  count?: number;
  lastResetDate?: string;
  contentIds?: string[];
}

interface UserStore {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser | null) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
    }),
    {
      name: "user-storage",
    },
  ),
);

const auth = getAuth(app);
onAuthStateChanged(auth, async (user) => {
  const userStore = useUserStore.getState();
  if (user) {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const today = new Date().toISOString().slice(0, 10);

    // 필수 데이터가 없거나 날짜가 바뀌었을 경우 초기화
    const needsReset = !userData || userData.lastResetDate !== today;
    const refreshedCount = needsReset ? 10 : (userData?.count ?? 10);
    const currentGrade = userData?.grade || "A";
    const currentContentIds = userData?.contentIds || [];

    if (needsReset || !userData?.count) {
      await update(userRef, {
        count: refreshedCount,
        lastResetDate: today,
        grade: currentGrade,
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
      });
    }

    userStore.setUser({
      ...user,
      grade: currentGrade,
      count: refreshedCount,
      lastResetDate: today,
      contentIds: currentContentIds,
    });
  } else {
    userStore.setUser(null);
  }
});

export default useUserStore;
