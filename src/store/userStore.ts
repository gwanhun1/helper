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
    }
  )
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
    const needsReset = userData?.lastResetDate !== today;
    const refreshedCount = needsReset ? 10 : userData?.count || 0;

    if (needsReset) {
      await update(userRef, { count: 10, lastResetDate: today });
    }

    userStore.setUser({
      ...user,
      grade: userData?.grade || "A",
      count: refreshedCount,
      lastResetDate: userData?.lastResetDate || today,
      contentIds: userData?.contentIds || [],
    });
  } else {
    userStore.setUser(null);
  }
});

export default useUserStore;
