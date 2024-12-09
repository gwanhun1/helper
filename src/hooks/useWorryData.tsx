import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";

// 로그 데이터 타입 정의
export interface Item {
  content: string; // 내용
  date: string; // 날짜
  id: string; // 고유 ID
  response: string; // 답변
  level?:number;
  username: string; // 사용자명
}

// 훅의 반환 타입 정의
interface UseWorryData {
  data: Item[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}


const useWorryData = (): UseWorryData => {
  const user = useUserStore((state) => state.user); // Zustand에서 사용자 정보 가져오기

  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const db = getDatabase(app); // Firebase Realtime Database 인스턴스 가져오기
    //   const dataRef = ref(db, `logs/${user.uid}`); // 사용자의 uid 기반 데이터 경로 설정
    const dataRef = ref(db, `logs/5sEM1OLG52PLUwjxEU8FPEFtVIu1`); // 사용자의 uid 기반 데이터 경로 설정

    try {
      const snapshot = await get(dataRef);

      if (snapshot.exists()) {
        const userData = Object.values(snapshot.val()) as Item[];
        setData(userData.reverse()); // 데이터를 역순으로 정렬
      } else {
        setData([]);
      }
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 사용자가 로그인하지 않았거나 uid가 없는 경우 데이터 초기화
    if (!user?.uid) {
      setData([]);
      return;
    }

    fetchData();
  }, [user]);

  return { data, loading, error, refreshData: fetchData };
};

export default useWorryData;
