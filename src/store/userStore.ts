import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../firebaseConfig";

interface ExtendedUser extends FirebaseUser {
  grade?: string;
  count?: number;
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
onAuthStateChanged(auth, (user) => {
  const userStore = useUserStore.getState();
  if (user) {
    userStore.setUser({
      ...user,
      grade: "A",
      count: 0,
    });
  } else {
    userStore.setUser(null);
  }
});

export default useUserStore;
