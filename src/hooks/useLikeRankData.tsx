import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";

export interface Item {
  content: string; // 내용
  date: string; // 날짜
  id: string; // 고유 ID
  response: string; // 답변
  username: string; // 사용자명
}

interface UseLikeRankData {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const useLikeRankData = (): UseLikeRankData => {
  const user = useUserStore((state) => state.user);

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const db = getDatabase(app);
      const dataRef = ref(db, `logs/xAqSeXq4HKd39cBdErCuJwXunaq2`);

      try {
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          const userData = Object.values(snapshot.val()) as Item[];
          setData(userData.reverse());
        } else {
          setData([]);
        }
      } catch (e) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, loading, error };
};

export default useLikeRankData;
