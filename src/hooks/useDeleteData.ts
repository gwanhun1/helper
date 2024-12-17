import { ref, remove, get, set, getDatabase } from "firebase/database";
import { app } from "../firebaseConfig";
import { useState } from "react";
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
      const contentsRef = ref(db, `contents/${id}`);
      const contentSnapshot = await get(contentsRef);

      if (contentSnapshot.exists()) {
        await remove(contentsRef);
      }

      const userRef = ref(db, `users/${user.uid}/contentIds`);
      const userSnapshot = await get(userRef);
      
      if (userSnapshot.exists()) {
        const currentIds = userSnapshot.val();
        const updatedIds = currentIds.filter((contentId: string) => contentId !== id);
        await set(userRef, updatedIds);
      }

      console.log("데이터가 성공적으로 삭제되었습니다:", id);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      setError("데이터 삭제 중 오류가 발생했습니다.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
