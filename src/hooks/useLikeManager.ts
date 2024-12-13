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

  // 게시글 좋아요 토글
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

      // 현재 게시글 데이터 가져오기
      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 기존 데이터가 없는 경우 초기값 설정
      const currentPost: Post = {
        ...post,
        like: post.like || 0,
        likedBy: post.likedBy || [],
        comments: post.comments || [],
      };

      const likedBy = currentPost.likedBy;
      const userIndex = likedBy.indexOf(displayName);

      let updatedPost;
      if (userIndex === -1) {
        // 좋아요 추가
        updatedPost = {
          ...currentPost,
          like: currentPost.like + 1,
          likedBy: [...likedBy, displayName],
        };
      } else {
        // 좋아요 취소
        const newLikedBy = [...likedBy];
        newLikedBy.splice(userIndex, 1);
        updatedPost = {
          ...currentPost,
          like: Math.max(currentPost.like - 1, 0),
          likedBy: newLikedBy,
        };
      }

      // Firebase 업데이트
      await update(postRef, updatedPost);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to toggle post like"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 댓글 좋아요 토글
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

      // 현재 게시글 데이터 가져오기
      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 기존 데이터가 없는 경우 초기값 설정
      const currentPost: Post = {
        ...post,
        like: post.like || 0,
        likedBy: post.likedBy || [],
        comments: post.comments || [],
      };

      // 댓글의 좋아요 수정
      const updatedComments = currentPost.comments.map((comment: Comment) => {
        if (comment.id === commentId) {
          const currentComment = {
            ...comment,
            likes: comment.likes || 0,
            likedBy: comment.likedBy || [],
          };

          const likedBy = currentComment.likedBy;
          const userIndex = likedBy.indexOf(displayName);

          if (userIndex === -1) {
            // 좋아요 추가
            return {
              ...currentComment,
              likes: currentComment.likes + 1,
              likedBy: [...likedBy, displayName],
            };
          } else {
            // 좋아요 취소
            const newLikedBy = [...likedBy];
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

      // Firebase 업데이트
      await update(postRef, {
        comments: updatedComments,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to toggle comment like"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 게시글 좋아요 상태 확인
  const isPostLiked = async (postId: string) => {
    const displayName = user?.displayName;
    if (!displayName) return false;

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 기존 데이터가 없는 경우 초기값 설정
      const currentPost: Post = {
        ...post,
        like: post.like || 0,
        likedBy: post.likedBy || [],
        comments: post.comments || [],
      };

      return currentPost.likedBy.includes(displayName) || false;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check post like status"
      );
      return false;
    }
  };

  // 댓글 좋아요 상태 확인
  const isCommentLiked = async (postId: string, commentId: string) => {
    const displayName = user?.displayName;
    if (!displayName) return false;

    try {
      const db = getDatabase(app);
      const postRef = ref(db, `contents/${postId}`);

      const snapshot = await get(postRef);
      const post = snapshot.val();

      // 기존 데이터가 없는 경우 초기값 설정
      const currentPost: Post = {
        ...post,
        like: post.like || 0,
        likedBy: post.likedBy || [],
        comments: post.comments || [],
      };

      const comment = currentPost.comments.find(
        (c: Comment) => c.id === commentId
      );
      if (!comment) return false;

      const currentComment = {
        ...comment,
        likes: comment.likes || 0,
        likedBy: comment.likedBy || [],
      };

      return currentComment.likedBy.includes(displayName) || false;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to check comment like status"
      );
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
