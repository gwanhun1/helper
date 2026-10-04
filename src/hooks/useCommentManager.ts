import { useState, useCallback } from "react";
import { apiRequest } from "../utils/api";
const useCommentManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const run = useCallback(async (body: unknown) => {
    setLoading(true); setError(null);
    try { await apiRequest("/api/community", body); return true; }
    catch (cause) { const error = cause instanceof Error ? cause : new Error("댓글을 처리하지 못했어요."); setError(error); throw error; }
    finally { setLoading(false); }
  }, []);
  const addComment = useCallback((id: string, content: string) => run({ id, action: "comment", content }), [run]);
  const deleteComment = useCallback((id: string, commentId: string) => run({ id, action: "deleteComment", commentId }), [run]);
  return { addComment, deleteComment, loading, error };
};
export default useCommentManager;
