import { useState } from "react";
import { getDatabase, ref, remove, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";

interface UseDeleteData {
  deleteData: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useDeleteData = (): UseDeleteData => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  const deleteData = async (id: string) => {
    if (!user?.uid) {
      setError("로그인이 필요합니다.");
      return;
    }

    if (!id) {
      setError("삭제할 데이터의 ID가 필요합니다.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      
      // contents와 logs 모두에서 데이터 확인 및 삭제
      const contentsRef = ref(db, `contents/${id}`);
      const logsRef = ref(db, `logs/${user.uid}/${id}`);

      // 데이터 존재 여부 확인
      const [contentsSnapshot, logsSnapshot] = await Promise.all([
        get(contentsRef),
        get(logsRef)
      ]);

      const deletePromises = [];

      // contents에 있는 데이터 삭제
      if (contentsSnapshot.exists()) {
        deletePromises.push(remove(contentsRef));
      }

      // logs에 있는 데이터 삭제
      if (logsSnapshot.exists()) {
        deletePromises.push(remove(logsRef));
      }

      // 모든 삭제 작업 실행
      await Promise.all(deletePromises);

      console.log("데이터가 성공적으로 삭제되었습니다:", id);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      setError("데이터 삭제 중 오류가 발생했습니다.");
      throw error; // 에러를 상위 컴포넌트로 전파
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
