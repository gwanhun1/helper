import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../firebaseConfig";

// Firebase User 타입 확장
interface ExtendedUser extends FirebaseUser {
  grade?: string;
  count?: number;
}

interface UserStore {
  user: ExtendedUser | null; // 확장된 User 타입 사용
  setUser: (user: ExtendedUser | null) => void; // 사용자 정보 설정 함수
}

// Zustand store 생성
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, // 초기 상태는 null
      setUser: (user) => set(() => ({ user })), // 사용자 정보 설정
    }),
    {
      name: "user-storage", // 로컬 스토리지에 저장될 키 이름
    }
  )
);

// Firebase 인증 상태 변화 감지
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  const userStore = useUserStore.getState(); // Zustand 상태 가져오기
  if (user) {
    // 확장된 User 타입에 grade와 count를 추가
    userStore.setUser({
      ...user,
      grade: "A", // 임의 값, 실제로는 데이터베이스 등에서 가져와야 함
      count: 0, // 임의 값, 실제로는 데이터베이스 등에서 가져와야 함
    });
  } else {
    // Firebase에서 로그아웃되면 상태 초기화
    userStore.setUser(null);
  }
});

export default useUserStore;