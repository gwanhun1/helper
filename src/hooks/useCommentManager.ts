import { getDatabase, ref, update, get } from "firebase/database";
import { app } from "../firebaseConfig";
import { Comment } from "./useLogData";
import useUserStore from "../store/userStore";
import { useState } from "react";

const useCommentManager = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (postId: string, content: string) => {
    if (!user?.displayName) {
      throw new Error("User must be logged in to comment");
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      // 현재 게시글 데이터 가져오기
      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 새 댓글 생성
      const newComment: Comment = {
        id: Date.now().toString(),
        content,
        username: user.displayName,
        date: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }), // MM/DD/YYYY 형식으로 통일
        likes: 0,
        likedBy: [],
      };

      // 기존 댓글 배열에 새 댓글 추가
      const currentComments = post.comments || [];
      const updatedComments = [...currentComments, newComment];

      // Firebase 업데이트
      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (
    postId: string,
    commentId: string,
    newContent: string
  ) => {
    if (!user?.displayName) {
      throw new Error("User must be logged in to update comment");
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      // 현재 게시글 데이터 가져오기
      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 댓글 찾아서 수정
      const updatedComments = post.comments.map((comment: Comment) =>
        comment.id === commentId && comment.username === user.displayName
          ? { ...comment, content: newContent }
          : comment
      );

      // Firebase 업데이트
      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    if (!user?.displayName) {
      throw new Error("User must be logged in to delete comment");
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      // 현재 게시글 데이터 가져오기
      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 댓글 필터링
      const updatedComments = post.comments.filter(
        (comment: Comment) =>
          !(comment.id === commentId && comment.username === user.displayName)
      );

      // Firebase 업데이트
      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addComment,
    updateComment,
    deleteComment,
    loading,
    error,
  };
};

export default useCommentManager;
