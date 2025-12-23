/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from "framer-motion";
import PageLayout from "../organisms/PageLayout";
import AdvicePromptCarousel from "../molecules/AdvicePromptCarousel";
import AdviceBanner from "../organisms/AdviceBanner";
import CommentList from "../organisms/CommentList";
import useUserStore from "../../store/userStore";
import useContentsData from "../../hooks/useContentsData";
import useLikeManager from "../../hooks/useLikeManager";
import useCommentManager from "../../hooks/useCommentManager";
import { toast } from "react-hot-toast";

interface Comment {
  id?: string;
  username?: string;
  content: string;
  date?: string;
  likes?: number;
}

interface Content {
  id: string;
  prompt: string;
  response: string;
  date?: string;
  like?: number;
  comments?: Comment[];
  username?: string;
  open?: boolean;
}

const Advice = () => {
  const { data: contentsData = [] } = useContentsData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useUserStore((state) => state.user);
  const { togglePostLike, toggleCommentLike, isPostLiked, isCommentLiked, loading: likeLoading } = useLikeManager();
  const { addComment, deleteComment, loading: commentLoading } = useCommentManager();
  const [newComment, setNewComment] = useState("");
  const [postLikeStates, setPostLikeStates] = useState<{ [key: string]: boolean }>({});
  const [commentLikeStates, setCommentLikeStates] = useState<{ [key: string]: boolean }>({});
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const currentContent = contentsData[currentIndex] || null;
  const isUpdatingRef = useRef(false);

  const formatRelativeDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    
    try {
      let date: Date;
      
      // ISO String 또는 표준 날짜 형식 우선 시도
      date = new Date(dateStr);
      
      // 만약 파싱 실패(Invalid Date)하고 슬래시가 포함된 경우 (기존 형식: MM/DD/YYYY)
      if (isNaN(date.getTime()) && dateStr.includes('/')) {
        const dateParts = dateStr.split('/');
        if (dateParts.length === 3) {
          const [month, day, year] = dateParts;
          date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        }
      }

      // 여전히 유효하지 않으면 원본 반환
      if (isNaN(date.getTime())) {
        return dateStr;
      }

      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffMinutes < 1) {
        return "방금 전";
      } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
      } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
      } else if (diffDays === 1) {
        return "어제";
      } else if (diffDays < 7) {
        return `${diffDays}일 전`;
      } else {
        // 일주일 이상된 경우 원래 날짜 표시 (YYYY-MM-DD 형식)
        return date.toISOString().split('T')[0];
      }
    } catch (error) {
      console.error('Date parsing error:', error);
      return dateStr || "";
    }
  };

  const updateLikeStates = useCallback(async () => {
    if (!currentContent?.id || isUpdatingRef.current) return;

    isUpdatingRef.current = true;
    setIsUpdatingLikes(true);
    try {
      const isLiked = await isPostLiked(currentContent.id);
      setPostLikeStates(prev => ({ ...prev, [currentContent.id]: isLiked }));

      if (currentContent.comments && Array.isArray(currentContent.comments)) {
        const commentPromises = currentContent.comments
          .filter((comment): comment is { id: string } => Boolean(comment?.id))
          .map(async comment => {
            const isCommentLikedState = await isCommentLiked(currentContent.id, comment.id);
            return [comment.id, isCommentLikedState];
          });

        const results = await Promise.all(commentPromises);
        const newCommentStates = Object.fromEntries(results);
        setCommentLikeStates(prev => ({ ...prev, ...newCommentStates }));
      }
    } catch (error) {
      console.error('Error updating like states:', error);
    } finally {
      setIsUpdatingLikes(false);
      isUpdatingRef.current = false;
    }
  }, [currentContent?.id, currentContent?.comments, isPostLiked, isCommentLiked]);

  useEffect(() => {
    updateLikeStates();
  }, [currentContent?.id]);

  const handlePrev = useCallback(() => {
    setSwipeDirection("right");
    setCurrentIndex((prev) => (prev - 1 + contentsData.length) % contentsData.length);
  }, [contentsData.length]);

  const handleNext = useCallback(() => {
    setSwipeDirection("left");
    setCurrentIndex((prev) => (prev + 1) % contentsData.length);
  }, [contentsData.length]);

  const handleAddComment = useCallback(async () => {
    if (!user?.uid) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    if (!newComment.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }
    if (!currentContent?.id) return;
    
    try {
      const success = await addComment(currentContent.id, newComment.trim());
      if (success) {
        setNewComment("");
        toast.success("댓글이 작성되었습니다.");
        updateLikeStates();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("댓글 작성에 실패했습니다.");
    }
  }, [user?.uid, newComment, currentContent?.id, addComment, updateLikeStates]);

  const handleTogglePostLike = useCallback(async (postId: string) => {
    if (!postId) return;

    try {
      await togglePostLike(postId);
      const newState = await isPostLiked(postId);
      setPostLikeStates(prev => ({ ...prev, [postId]: newState }));
    } catch (error) {
      console.error('Error toggling post like:', error);
    }
  }, [togglePostLike, isPostLiked]);

  const handleToggleCommentLike = useCallback(async (postId: string, commentId: string) => {
    if (!postId || !commentId) return;

    try {
      await toggleCommentLike(postId, commentId);
      const newState = await isCommentLiked(postId, commentId);
      setCommentLikeStates(prev => ({ ...prev, [commentId]: newState }));
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  }, [toggleCommentLike, isCommentLiked]);

  const handleDeleteComment = useCallback(async (commentId: string) => {
    if (!currentContent?.id || !commentId) return;

    try {
      const success = await deleteComment(currentContent.id, commentId);
      if (success) {
        toast.success("댓글이 삭제되었습니다.");
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error("댓글 삭제에 실패했습니다.");
    }
  }, [currentContent?.id, deleteComment]);

  if (!currentContent) {
    return (
      <PageLayout requireAuth>
        <div className="flex items-center justify-center h-full">
          <p>
            데이터를 불러오는 중입니다...
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout requireAuth>
      <div 
        className="bg-[#F2F4F6] pb-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div 
          className="bg-white px-5 py-3 border-b relative"
        >
          <div className="flex items-end gap-3">
            <h1 className="text-xl font-bold text-[#333333]">고민나누기</h1>
            <span className="text-[10px] text-[#666666] mb-1">함께 고민을 나눠요</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <AdviceBanner />
          </div>

          <div
            className="bg-white rounded-2xl border border-[#E5E8EB]"
          >
            <AnimatePresence mode="wait" custom={swipeDirection}>
              <div>
                <AdvicePromptCarousel
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  prompts={contentsData}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              </div>
            </AnimatePresence>
            
            {currentContent?.username &&
              user?.displayName &&
              currentContent.username.replace(/\s+/g, "") === user.displayName && (
                <div 
                  className="px-4 py-3 border-t border-[#E5E8EB] flex justify-between items-center"
                >
                  <div className="flex items-center gap-1">
                    <span className="sparkle-effect px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-full shadow-md border border-green-600/20">
                      ME
                    </span>
                    <span className="text-xs text-green-600 font-medium">내가 쓴 글</span>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                    ✓ 공유됨
                  </span>
                </div>
              )}
          </div>

          <div 
            className="space-y-4 mt-6"
          >
            <CommentList
              mainContent={{
                id: currentContent.id,
                response: currentContent.response,
                date: currentContent.date,
                like: currentContent.like,
                who: currentContent.who,
              }}
              comments={(currentContent.comments || [])
                .filter((comment): comment is Comment => comment.content !== undefined)}
              isPostLiked={postLikeStates[currentContent.id]}
              commentLikeStates={commentLikeStates}
              currentUsername={user?.displayName || undefined}
              onTogglePostLike={() => handleTogglePostLike(currentContent.id)}
              onToggleCommentLike={(commentId) => handleToggleCommentLike(currentContent.id, commentId)}
              onDeleteComment={handleDeleteComment}
              newComment={newComment}
              onCommentChange={setNewComment}
              onCommentSubmit={handleAddComment}
              isLoading={likeLoading || commentLoading}
              formatDate={formatRelativeDate}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Advice;
