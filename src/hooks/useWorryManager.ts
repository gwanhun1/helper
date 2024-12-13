import { useState } from "react";
import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";

interface UseWorryManager {
  addWorry: (content: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useWorryManager = (): UseWorryManager => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const db = getDatabase(app);

  const addWorry = async (content: string) => {
    if (!user?.uid) {
      setError("로그인이 필요합니다.");
      return;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newWorryRef = push(ref(db, "contents"));
      const worryId = newWorryRef.key;
      
      if (!worryId) {
        throw new Error("컨텐츠 ID를 생성할 수 없습니다.");
      }

      const worryData: Omit<Item, 'id'> = {
        content,
        date: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        username: user.displayName || "Anonymous",
        response: "",
        level: 1,
        open: true,
        comments: [],
        like: 0,
        likedBy: []
      };

      await set(newWorryRef, worryData);
      
      const userRef = ref(db, `users/${user.uid}/contentIds`);
      const snapshot = await get(userRef);
      const currentIds = snapshot.exists() ? snapshot.val() : [];
      await set(userRef, [...currentIds, worryId]);

    } catch (e) {
      setError(`걱정을 추가하는 중 오류가 발생했습니다: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { addWorry, loading, error };
};

export default useWorryManager;
