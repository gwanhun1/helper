import { useState, useCallback } from "react";
import { getDatabase, get, ref } from "firebase/database";
import { app } from "../firebaseConfig";
import { apiRequest } from "../utils/api";
import useUserStore from "../store/userStore";
const useLikeManager = () => {
  const uid = useUserStore(state => state.user?.uid);
  const [loading, setLoading] = useState(false);
  const run = useCallback(async (body: unknown) => {
    setLoading(true);
    try { await apiRequest("/api/community", body); } finally { setLoading(false); }
  }, []);
  const togglePostLike = useCallback((id: string) => run({ id, action: "like" }), [run]);
  const toggleCommentLike = useCallback((id: string, commentId: string) => run({ id, commentId, action: "likeComment" }), [run]);
  const isPostLiked = useCallback(async (id: string) => uid ? Boolean((await get(ref(getDatabase(app), `publicContents/${id}/likedBy/${uid}`))).val()) : false, [uid]);
  const isCommentLiked = useCallback(async (id: string, commentId: string) => uid ? Boolean((await get(ref(getDatabase(app), `publicContents/${id}/comments/${commentId}/likedBy/${uid}`))).val()) : false, [uid]);
  return { togglePostLike, toggleCommentLike, isPostLiked, isCommentLiked, loading };
};
export default useLikeManager;
