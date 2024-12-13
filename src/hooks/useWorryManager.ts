import { getDatabase, ref, set, push } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";

interface UseWorryManager {
  saveWorry: (item: Item) => Promise<void>;
}

const useWorryManager = (): UseWorryManager => {
  const user = useUserStore((state) => state.user);

  const saveWorry = async (item: Item) => {
    if (!user?.uid) {
      throw new Error("로그인이 필요합니다.");
    }

    const db = getDatabase(app);
    
    try {
      // logs에 저장
      const logsRef = ref(db, `logs/${user.uid}`);
      const logItem = {
        ...item,
        open: false  // 기본값은 비공개
      };
      await push(logsRef, logItem);

      // contents에 저장
      const contentsRef = ref(db, 'contents');
      const newContentRef = await push(contentsRef);
      const contentItem = {
        ...item,
        id: newContentRef.key,
        open: false  // 기본값은 비공개
      };
      await set(newContentRef, contentItem);
    } catch (e) {
      console.error("고민 데이터 저장 중 오류가 발생했습니다:", e);
      throw e;
    }
  };

  return { saveWorry };
};

export default useWorryManager;
