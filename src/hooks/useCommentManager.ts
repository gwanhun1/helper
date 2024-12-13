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

    if (!content.trim()) {
      throw new Error("Comment content cannot be empty");
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        throw new Error("Post not found");
      }

      const post = snapshot.val();
      const currentComments = Array.isArray(post.comments) ? post.comments : [];

      const newComment: Comment = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: content.trim(),
        username: user.displayName,
        date: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        likes: 0,
        likedBy: [],
      };

      const updatedComments = [...currentComments, newComment];

      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add comment";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (postId: string, commentId: string, newContent: string) => {
    if (!user?.displayName) {
      throw new Error("User must be logged in to update comment");
    }

    if (!newContent.trim()) {
      throw new Error("Comment content cannot be empty");
    }

    setLoading(true);
    setError(null);

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        throw new Error("Post not found");
      }

      const post = snapshot.val();
      if (!Array.isArray(post.comments)) {
        throw new Error("No comments found");
      }

      const updatedComments = post.comments.map((comment: Comment) =>
        comment.id === commentId && comment.username === user.displayName
          ? { ...comment, content: newContent.trim() }
          : comment
      );

      if (updatedComments.length === post.comments.length) {
        throw new Error("Comment not found or unauthorized");
      }

      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update comment";
      setError(errorMessage);
      throw new Error(errorMessage);
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

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        throw new Error("Post not found");
      }

      const post = snapshot.val();
      if (!Array.isArray(post.comments)) {
        throw new Error("No comments found");
      }

      const updatedComments = post.comments.filter(
        (comment: Comment) =>
          !(comment.id === commentId && comment.username === user.displayName)
      );

      if (updatedComments.length === post.comments.length) {
        throw new Error("Comment not found or unauthorized");
      }

      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete comment";
      setError(errorMessage);
      throw new Error(errorMessage);
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
