import { useState } from 'react';
import { getDatabase, ref, push, set, get, remove } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";

export interface UseWorryManager {
  worries: Item[];
  addWorry: (content: string) => Promise<void>;
  deleteWorry: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useWorryManager = (): UseWorryManager => {
  const [worries, setWorries] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const user = useUserStore((state) => state.user);
  const db = getDatabase(app);

  const addWorry = async (content: string) => {
    if (!user?.uid) {
      setError(new Error("로그인이 필요합니다."));
      return;
    }

    if (!content.trim()) {
      setError(new Error("내용을 입력해주세요."));
      return;
    }

    try {
      setLoading(true);
      const newWorryRef = push(ref(db, "contents"));
      const worryId = newWorryRef.key;
      
      if (!worryId) {
        throw new Error("컨텐츠 ID를 생성할 수 없습니다.");
      }

      const newWorry: Omit<Item, 'id'> = {
        content,
        date: new Date().toISOString(),
        response: '',
        username: user.displayName || "Anonymous",
        timestamp: Date.now(),
        userId: user.uid,
        level: 1,
        open: true,
        comments: [],
        like: 0,
        likedBy: []
      };
      
      await set(newWorryRef, { ...newWorry, id: worryId });
      
      const userRef = ref(db, `users/${user.uid}/contentIds`);
      const snapshot = await get(userRef);
      const currentIds = snapshot.exists() ? snapshot.val() : [];
      
      const uniqueIds = new Set([...currentIds, worryId]);
      await set(userRef, Array.from(uniqueIds));

      setWorries(prev => [...prev, { ...newWorry, id: worryId }]);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const deleteWorry = async (id: string) => {
    try {
      setLoading(true);
      const worryRef = ref(db, `contents/${id}`);
      await remove(worryRef);

      const userRef = ref(db, `users/${user.uid}/contentIds`);
      const snapshot = await get(userRef);
      const currentIds = snapshot.exists() ? snapshot.val() : [];
      
      const uniqueIds = new Set([...currentIds].filter((itemId) => itemId !== id));
      await set(userRef, Array.from(uniqueIds));

      setWorries(prev => prev.filter(worry => worry.id !== id));
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  return {
    worries,
    addWorry,
    deleteWorry,
    loading,
    error
  };
};

export default useWorryManager;
