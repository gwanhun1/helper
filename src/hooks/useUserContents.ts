import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";

interface UseUserContents {
  userContents: Item[];
  loading: boolean;
  error: string | null;
  refreshUserContents: () => Promise<void>;
}

const useUserContents = (): UseUserContents => {
  const user = useUserStore((state) => state.user);
  const [userContents, setUserContents] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processUserContents = async (contentIds: string[]): Promise<Item[]> => {
    const db = getDatabase(app);
    if (!contentIds.length) return [];

    const contentsSnapshot = await get(ref(db, "contents"));
    if (!contentsSnapshot.exists()) return [];

    const allContents = contentsSnapshot.val();
    return Object.values(allContents).filter(
      (content): content is Item =>
        typeof content === "object" &&
        content !== null &&
        "id" in content &&
        typeof content.id === "string" &&
        contentIds.includes(content.id)
    );
  };

  const fetchUserContents = async () => {
    if (!user?.uid) { setUserContents([]); return; }

    setLoading(true);
    setError(null);
    try {
      const db = getDatabase(app);
      const userSnapshot = await get(ref(db, `users/${user.uid}`));
      if (!userSnapshot.exists()) { setUserContents([]); return; }
      const userData = userSnapshot.val();
      const contentIds = userData.contentIds || [];
      setUserContents(await processUserContents(contentIds));
    } catch (e) {
      setError(`사용자 컨텐츠를 가져오는 중 오류가 발생했습니다: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) { setUserContents([]); return; }

    let mounted = true;
    let unsubscribeFn: (() => void) | null = null;
    const db = getDatabase(app);

    setLoading(true);

    const subscribeToPath = (path: string) => {
      const unsubscribe = onValue(
        ref(db, path),
        async (snapshot) => {
          if (!mounted) return;

          // 데이터 없으면 대체 경로 시도 (users/users/{uid} → users/{uid})
          if (!snapshot.exists()) {
            if (path === `users/users/${user.uid}`) {
              unsubscribe();
              subscribeToPath(`users/${user.uid}`);
            } else {
              setUserContents([]);
              setLoading(false);
            }
            return;
          }

          setLoading(true);
          try {
            const contentIds = snapshot.val()?.contentIds || [];
            const processedContents = await processUserContents(contentIds);
            if (mounted) setUserContents(processedContents);
          } catch (err) {
            console.log("[DB] Error processing user data:", err);
            if (mounted) setError(`사용자 컨텐츠를 가져오는 중 오류가 발생했습니다: ${err instanceof Error ? err.message : "알 수 없는 오류"}`);
          } finally {
            if (mounted) setLoading(false);
          }
        },
        (err) => {
          // 권한 오류 등 Firebase 에러 시 대체 경로 시도
          if (mounted && path === `users/users/${user.uid}`) {
            unsubscribe();
            subscribeToPath(`users/${user.uid}`);
          } else {
            console.log("[DB] Database error:", err);
            if (mounted) { setError(`데이터베이스 연결 오류: ${err.message}`); setLoading(false); }
          }
        }
      );
      unsubscribeFn = unsubscribe;
      return unsubscribe;
    };

    subscribeToPath(`users/users/${user.uid}`);

    return () => {
      mounted = false;
      unsubscribeFn?.();
    };
  }, [user?.uid]);

  return { userContents, loading, error, refreshUserContents: fetchUserContents };
};

export default useUserContents;
