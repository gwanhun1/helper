import { useState } from "react";
import { apiRequest } from "../utils/api";
const useDeleteData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteData = async (id: string) => {
    setLoading(true); setError(null);
    try { await apiRequest("/api/records", { id }, "DELETE"); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "삭제하지 못했어요."); throw cause; }
    finally { setLoading(false); }
  };
  return { deleteData, loading, error };
};
export default useDeleteData;
