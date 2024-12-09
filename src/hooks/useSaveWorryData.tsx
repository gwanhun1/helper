import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useWorryData";

const useSaveWorryData = () => {
  const user = useUserStore((state) => state.user);

  const saveData = async (item: Item) => {
    if (!user?.uid) return;

    const db = getDatabase(app);
    // const dataRef = ref(db, `logs/${user.uid}/${item.id}`);
    const dataRef = ref(db, `logs/5sEM1OLG52PLUwjxEU8FPEFtVIu1`); // 사용자의 uid 기반 데이터 경로 설정

    try {
      await set(dataRef, item);
    } catch (e) {
      console.error("데이터 저장 중 오류가 발생했습니다:", e);
    }
  };

  return { saveData };
};

export default useSaveWorryData;
