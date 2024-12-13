import { getDatabase, ref, update, get } from "firebase/database";
import { app } from "../firebaseConfig";
import useUserStore from "../store/userStore";
import { useState } from "react";

interface Comment {
  id: string;
  likedBy: string[];
  likes: number;
}

interface Post {
  id: string;
  likedBy: string[];
  like: number;
  comments: Comment[];
}

const useLikeManager = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePostLike = async (postId: string) => {
    const displayName = user?.displayName;
    if (!displayName) {
      throw new Error("User must be logged in to like posts");
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
      const currentPost = {
        ...post,
        like: post.like || 0,
        likedBy: Array.isArray(post.likedBy) ? post.likedBy : [],
      };

      const userIndex = currentPost.likedBy.indexOf(displayName);
      let updatedPost;

      if (userIndex === -1) {
        updatedPost = {
          ...currentPost,
          like: currentPost.like + 1,
          likedBy: [...currentPost.likedBy, displayName],
        };
      } else {
        const newLikedBy = [...currentPost.likedBy];
        newLikedBy.splice(userIndex, 1);
        updatedPost = {
          ...currentPost,
          like: Math.max(currentPost.like - 1, 0),
          likedBy: newLikedBy,
        };
      }

      await update(postRef, updatedPost);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to toggle post like";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleCommentLike = async (postId: string, commentId: string) => {
    const displayName = user?.displayName;
    if (!displayName) {
      throw new Error("User must be logged in to like comments");
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

      const updatedComments = post.comments.map((comment: Comment) => {
        if (comment.id === commentId) {
          const currentComment = {
            ...comment,
            likes: comment.likes || 0,
            likedBy: Array.isArray(comment.likedBy) ? comment.likedBy : [],
          };

          const userIndex = currentComment.likedBy.indexOf(displayName);

          if (userIndex === -1) {
            return {
              ...currentComment,
              likes: currentComment.likes + 1,
              likedBy: [...currentComment.likedBy, displayName],
            };
          } else {
            const newLikedBy = [...currentComment.likedBy];
            newLikedBy.splice(userIndex, 1);
            return {
              ...currentComment,
              likes: Math.max(currentComment.likes - 1, 0),
              likedBy: newLikedBy,
            };
          }
        }
        return comment;
      });

      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to toggle comment like";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isPostLiked = async (postId: string) => {
    const displayName = user?.displayName;
    if (!displayName) return false;

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        return false;
      }

      const post = snapshot.val();
      return Array.isArray(post.likedBy) && post.likedBy.includes(displayName);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to check post like status";
      setError(errorMessage);
      return false;
    }
  };

  const isCommentLiked = async (postId: string, commentId: string) => {
    const displayName = user?.displayName;
    if (!displayName) return false;

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      if (!snapshot.exists()) {
        return false;
      }

      const post = snapshot.val();
      if (!Array.isArray(post.comments)) {
        return false;
      }

      const comment = post.comments.find((c: Comment) => c.id === commentId);
      if (!comment) {
        return false;
      }

      return Array.isArray(comment.likedBy) && comment.likedBy.includes(displayName);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to check comment like status";
      setError(errorMessage);
      return false;
    }
  };

  return {
    togglePostLike,
    toggleCommentLike,
    isPostLiked,
    isCommentLiked,
    loading,
    error,
  };
};

export default useLikeManager;
