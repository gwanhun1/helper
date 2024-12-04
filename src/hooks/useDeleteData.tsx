import { useState } from "react";
import { getDatabase, ref, remove } from "firebase/database";
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
      const dataRef = ref(db, `contents/${id}`);
      await remove(dataRef);
      console.log("데이터가 성공적으로 삭제되었습니다:", id);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      setError("데이터 삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
