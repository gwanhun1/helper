import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { Item } from "./useContentsData";

interface UseLogsData {
  logsData: Item[];
  loading: boolean;
  error: string | null;
  refreshLogs: () => Promise<void>;
}

const useLogsData = (): UseLogsData => {
  const user = useUserStore((state) => state.user);
  const [logsData, setLogsData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    if (!user?.uid) {
      setLogsData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const logsRef = ref(db, `logs/${user.uid}`);
      const snapshot = await get(logsRef);

      if (snapshot.exists()) {
        const logsData = snapshot.val();
        const processedData = Object.entries(logsData).map(
          ([key, value]) => ({
            ...(value as Omit<Item, "id">),
            id: key,
            comments: (value as any).comments || [],
            like: (value as any).like || 0,
            likedBy: (value as any).likedBy || [],
          })
        );
        setLogsData(processedData.reverse());
      } else {
        setLogsData([]);
      }
    } catch (e) {
      setError(
        `로그 데이터를 가져오는 중 오류가 발생했습니다: ${
          e instanceof Error ? e.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.uid) {
      setLogsData([]);
      return;
    }

    setLoading(true);
    const db = getDatabase(app);
    const logsRef = ref(db, `logs/${user.uid}`);

    const unsubscribe = onValue(
      logsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const processedData = Object.entries(rawData).map(([key, value]) => ({
            ...(value as Omit<Item, "id">),
            id: key,
            comments: (value as any).comments || [],
            like: (value as any).like || 0,
            likedBy: (value as any).likedBy || [],
          }));
          setLogsData(processedData.reverse());
        } else {
          setLogsData([]);
        }
        setLoading(false);
      },
      (error) => {
        setError(`로그 데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { logsData, loading, error, refreshLogs: fetchLogs };
};

export default useLogsData;
