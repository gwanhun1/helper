import { useState } from 'react';
import { Comment } from './useContentsData';

interface UseCommentManager {
  comments: Comment[];
  addComment: (content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  refreshData: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useCommentManager = (): UseCommentManager => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addComment = async (content: string) => {
    try {
      setLoading(true);
      const newComment: Comment = {
        id: Date.now().toString(),
        content,
        username: 'User', // 실제 사용자 이름으로 대체해야 함
        date: new Date().toISOString(),
        likes: 0,
        likedBy: []
      };
      setComments(prev => [...prev, newComment]);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      setLoading(true);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      // Firebase에서 최신 댓글 데이터를 가져옵니다
      const response = await fetch('/api/comments');
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  return {
    comments,
    addComment,
    deleteComment,
    refreshData,
    loading,
    error
  };
};

export default useCommentManager;
