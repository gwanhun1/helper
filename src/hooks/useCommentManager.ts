import { useState, useCallback } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";

export interface Comment {
  id: string;
  content: string;
  username: string;
  date: string;
  likes: number;
  likedBy: string[];
}

interface UseCommentManager {
  addComment: (postId: string, content: string) => Promise<boolean>;
  deleteComment: (postId: string, commentId: string) => Promise<boolean>;
  loading: boolean;
  error: Error | null;
}

const useCommentManager = (): UseCommentManager => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const user = useUserStore((state) => state.user);

  const addComment = useCallback(async (postId: string, content: string): Promise<boolean> => {
    if (!user?.uid || !user?.displayName) {
      setError(new Error("로그인이 필요합니다."));
      return false;
    }

    if (!content.trim()) {
      setError(new Error("댓글 내용을 입력해주세요."));
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }

      const post = snapshot.val();
      const existingComments = Array.isArray(post.comments) ? post.comments : [];

      const newComment: Comment = {
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: content.trim(),
        username: user.displayName,
        date: new Date().toISOString(),
        likes: 0,
        likedBy: []
      };

      const updatedComments = [...existingComments, newComment];

      await update(postRef, {
        comments: updatedComments
      });

      setLoading(false);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("댓글 작성에 실패했습니다.");
      setError(error);
      setLoading(false);
      return false;
    }
  }, [user?.uid, user?.displayName]);

  const deleteComment = useCallback(async (postId: string, commentId: string): Promise<boolean> => {
    if (!user?.uid || !user?.displayName) {
      setError(new Error("로그인이 필요합니다."));
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }

      const post = snapshot.val();
      if (!Array.isArray(post.comments)) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      // 자신의 댓글만 삭제 가능
      const commentToDelete = post.comments.find((c: Comment) => c.id === commentId);
      if (!commentToDelete) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      if (commentToDelete.username !== user.displayName) {
        throw new Error("자신의 댓글만 삭제할 수 있습니다.");
      }

      const updatedComments = post.comments.filter((c: Comment) => c.id !== commentId);

      await update(postRef, {
        comments: updatedComments
      });

      setLoading(false);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("댓글 삭제에 실패했습니다.");
      setError(error);
      setLoading(false);
      return false;
    }
  }, [user?.uid, user?.displayName]);

  return {
    addComment,
    deleteComment,
    loading,
    error
  };
};

export default useCommentManager;
