// userStore.ts
import { create } from "zustand";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface User {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface UserStore {
  user: User | null; // 사용자 정보만 저장
  setUser: (user: User | null) => void; // 사용자 정보 설정 함수
}

// Zustand store 생성
const useUserStore = create<UserStore>((set) => ({
  user: null, // 초기 상태는 null
  setUser: (user) => set(() => ({ user })), // 사용자 정보 설정
}));

// Firebase 인증 상태 변화 감지
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const userStore = useUserStore.getState(); // 상태 가져오기
  if (user) {
    // Firebase 로그인 성공 시 사용자 정보 상태에 저장
    userStore.setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } else {
    // Firebase에서 로그아웃되면 상태 초기화
    userStore.setUser(null);
  }
});

export default useUserStore;
