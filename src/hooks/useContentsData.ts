import { useEffect, useState } from "react";
import { get, getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebaseConfig";
import { processContentsData } from "../utils/contentUtils";

export interface Comment {
  id?: string;
  content?: string;
  username?: string;
  date?: string;
  likes?: number;
  likedBy?: string[];
  timestamp?: number;
  userId?: string;
  itemId?: string;
}

export interface Item {
  content: string;
  date: string;
  id: string;
  response: string;
  username: string;
  timestamp: number;
  userId: string;
  open?: boolean;
  level?: number;
  comments?: Comment[];
  like?: number;
  likedBy?: string[];
  who?: string;
  how?: string;
}

interface UseContentsData {
  data: Item[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const useContentsData = (): UseContentsData => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const contentsRef = ref(db, "contents");
      const snapshot = await get(contentsRef);

      if (snapshot.exists()) {
        const contentsData = snapshot.val();
        const processedData = processContentsData(contentsData);
        setData(processedData.reverse());
      } else {
        setData([]);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      setError(
        `데이터를 가져오는 중 오류가 발생했습니다: ${
          e instanceof Error ? e.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    const db = getDatabase(app);
    const contentsRef = ref(db, "contents");

    const unsubscribe = onValue(
      contentsRef,
      (snapshot) => {
        if (!mounted) return;

        if (snapshot.exists()) {
          const rawData = snapshot.val();
          const processedData = processContentsData(rawData);
          if (mounted) {
            setData(processedData.reverse());
          }
        } else {
          if (mounted) {
            setData([]);
          }
        }
        if (mounted) {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Real-time data error:", error);
        if (mounted) {
          setError(`데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { data, loading, error, refreshData: fetchData };
};

export default useContentsData;
