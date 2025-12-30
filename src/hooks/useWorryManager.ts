import { useState } from "react";
import { getDatabase, ref, push, set, get, remove } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";
import useWorryStore from "../store/worryStore";

export interface UseWorryManager {
  worries: Item[];
  addWorry: (content: string | WorryContent) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

interface WorryContent {
  content: string;
  date: string;
  id: string;
  response: string;
  level: number;
  username: string;
  open: boolean;
  comments: never[];
  who: string;
  how: string;
}

const useWorryManager = (): UseWorryManager => {
  const [worries, setWorries] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const user = useUserStore((state) => state.user);
  const db = getDatabase(app);
  const { worry, who, how, isOpen } = useWorryStore();

  const addWorry = async (content: string | WorryContent) => {
    if (!user?.uid) {
      setError(new Error("로그인이 필요합니다."));
      return;
    }

    if (typeof content === "string" && !content.trim()) {
      setError(new Error("내용을 입력해주세요."));
      return;
    }

    try {
      setLoading(true);
      const worryData =
        typeof content === "string"
          ? {
              content: worry,
              date: new Date().toISOString(),
              id: String(Date.now()),
              response: content,
              level: Math.floor(Math.random() * 5) + 1,
              username: user.displayName || "Anonymous",
              open: isOpen,
              comments: [],
              who: who,
              how: how,
            }
          : content;

      const newWorryRef = push(ref(db, "contents"));
      const worryId = newWorryRef.key;

      if (!worryId) {
        throw new Error("컨텐츠 ID를 생성할 수 없습니다.");
      }

      await set(newWorryRef, { ...worryData, id: worryId });

      if (user?.uid) {
        const userRef = ref(db, `users/${user.uid}/contentIds`);
        const snapshot = await get(userRef);
        const existingIds = snapshot.val() || [];
        const uniqueIds = new Set([...existingIds, worryId]);
        await set(userRef, Array.from(uniqueIds));
      }

      setWorries((prev) => [...prev, { ...worryData, id: worryId } as any]);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err; // Re-throw so the caller knows it failed
    }
  };

  return {
    worries,
    addWorry,
    loading,
    error,
  };
};

export default useWorryManager;
