import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

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
    // Firebase에서 사용자 데이터 가져오기
    const db = getDatabase(app);
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    userStore.setUser({
      ...user,
      grade: userData?.grade || "A",
      count: userData?.count || 0,
      lastResetDate: userData?.lastResetDate || "",
      contentIds: userData?.contentIds || [],
    });
  } else {
    userStore.setUser(null);
  }
});

export default useUserStore;
