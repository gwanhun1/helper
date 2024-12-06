import { useEffect, useState } from "react";
import { get, getDatabase, ref, onValue, off } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";

// 로그 데이터 타입 정의
export interface Item {
  content: string; // 내용
  date: string; // 날짜
  id: string; // 고유 ID
  response: string; // 답변
  username: string; // 사용자명
}

// 훅의 반환 타입 정의
interface UseLogData {
  data: Item[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

// useLogData 훅 정의
const useLogData = (): UseLogData => {
  const user = useUserStore((state) => state.user);
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const dataRef = ref(db, 'contents');
      const snapshot = await get(dataRef);

      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const userData = Object.entries(rawData).map(([key, value]) => ({
          ...(value as Omit<Item, 'id'>),
          id: key
        }));
        setData(userData.reverse());
      } else {
        setData([]);
      }
    } catch (e) {
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
    if (!user?.uid) {
      setData([]);
      return;
    }

    setLoading(true);
    const db = getDatabase(app);
    const dataRef = ref(db, 'contents');

    // 실시간 리스너 설정
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const userData = Object.entries(rawData).map(([key, value]) => ({
          ...(value as Omit<Item, 'id'>),
          id: key
        }));
        setData(userData.reverse());
      } else {
        setData([]);
      }
      setLoading(false);
    }, (error) => {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`);
      setLoading(false);
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      unsubscribe();
    };
  }, [user]);

  return { data, loading, error, refreshData: fetchData };
};

export default useLogData;
