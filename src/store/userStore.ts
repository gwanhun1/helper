import { create } from "zustand";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { apiRequest } from "../utils/api";

export interface ExtendedUser extends User {
  count?: number;
  lastResetDate?: string;
  nextResetAt?: number;
}
interface UserStore {
  user: ExtendedUser | null;
  authReady: boolean;
  accountError: string | null;
  setUser: (user: ExtendedUser | null) => void;
  refreshAccount: () => Promise<void>;
}
const useUserStore = create<UserStore>((set) => ({
  user: null,
  authReady: false,
  accountError: null,
  setUser: (user) => set({ user }),
  refreshAccount: async () => {
    const current = auth.currentUser;
    if (!current) return;
    try {
      const quota = await apiRequest<{
        count: number;
        lastResetDate: string;
        nextResetAt: number;
      }>("/api/account", undefined, "GET");
      if (auth.currentUser?.uid === current.uid)
        set({
          user: Object.assign(
            Object.create(Object.getPrototypeOf(current)),
            current,
            quota,
          ),
          accountError: null,
        });
    } catch (error) {
      if (auth.currentUser?.uid === current.uid)
        set({
          accountError:
            error instanceof Error
              ? error.message
              : "사용자 정보를 불러오지 못했어요.",
        });
    }
  },
}));
onAuthStateChanged(auth, (user) => {
  useUserStore.setState({ user, authReady: true, accountError: null });
  if (user) void useUserStore.getState().refreshAccount();
});
// Old persisted Firebase users must never be treated as an authenticated session.
localStorage.removeItem("user-storage");
export default useUserStore;
