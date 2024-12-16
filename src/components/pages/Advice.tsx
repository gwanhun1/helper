import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PageLayout from "../organisms/PageLayout";
import AdvicePromptCarousel from "../molecules/AdvicePromptCarousel";
import AdviceBanner from "../organisms/AdviceBanner";
import CommentList from "../organisms/CommentList";
import useUserStore from "../../store/userStore";
import useContentsData from "../../hooks/useContentsData";
import useLikeManager from "../../hooks/useLikeManager";
import useCommentManager from "../../hooks/useCommentManager";

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
}

const Advice = () => {
  const { data: contentsData = [] } = useContentsData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useUserStore((state) => state.user);
  const { togglePostLike, toggleCommentLike, isPostLiked, isCommentLiked } = useLikeManager();
  const { addComment } = useCommentManager();
  const [newComment, setNewComment] = useState("");
  const [postLikeStates, setPostLikeStates] = useState<{ [key: string]: boolean }>({});
  const [commentLikeStates, setCommentLikeStates] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentContent = contentsData[currentIndex] || null;

  const formatRelativeDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    
    try {
      // 날짜 형식이 유효한지 먼저 확인
      if (!dateStr.includes('/')) {
        return dateStr;
      }

      const dateParts = dateStr.split('/');
      if (dateParts.length !== 3) {
        return dateStr;
      }

      const [month, day, year] = dateParts;
      if (!month || !day || !year) {
        return dateStr;
      }

      const formattedMonth = month.padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      const date = new Date(`${year}-${formattedMonth}-${formattedDay}`);

      if (isNaN(date.getTime())) {
        return dateStr;
      }

      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = (now.getMonth() + 12 * now.getFullYear()) - (date.getMonth() + 12 * date.getFullYear());

      if (diffHours < 24) {
        if (diffHours === 0) return "방금 전";
        return `${diffHours}시간 전`;
      } else if (diffDays === 1) {
        return "어제";
      } else if (diffDays === 2) {
        return "그저께";
      } else if (diffMonths < 1) {
        return `${diffDays}일 전`;
      } else {
        return dateStr;
      }
    } catch (error) {
      console.error('Date parsing error:', error);
      return dateStr || "";
    }
  };

  const updateLikeStates = useCallback(async () => {
    if (!currentContent?.id || isLoading) return;

    setIsLoading(true);
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
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentContent?.id, isPostLiked, isCommentLiked]);

  useEffect(() => {
    updateLikeStates();
  }, [updateLikeStates]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + contentsData.length) % contentsData.length);
  }, [contentsData.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % contentsData.length);
  }, [contentsData.length]);

  const handleAddComment = useCallback(async () => {
    alert("잠시후 다시 시도해주세요.")
    if (!user?.uid || !newComment.trim() || !currentContent?.id) return;
    
    try {
      await addComment(currentContent.id, newComment.trim());
      setNewComment("");
      updateLikeStates();
    } catch (error) {
      console.error("Failed to add comment:", error);
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

  if (!currentContent) {
    return (
      <PageLayout requireAuth>
        <div className="flex items-center justify-center h-full">
          <p>데이터를 불러오는 중입니다...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout requireAuth>
      <div className="bg-[#F2F4F6] pb-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* 상단 헤더 */}
        <div className="bg-white px-5 py-3 border-b relative">
          <div className="flex items-end gap-3">
            <h1 className="text-xl font-bold text-[#333333]">고민나누기</h1>
            <span className="text-[10px] text-[#666666] mb-1">함께 고민을 나눠요</span>
          </div>
        </div>

        {/* 메인 컨테이너 */}
        <div className="p-4 space-y-4">
          <AdviceBanner />

          {/* 고민 폼 */}
          <div className="bg-white rounded-2xl border border-[#E5E8EB]">
            <AdvicePromptCarousel
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              prompts={contentsData}
              onPrev={handlePrev}
              onNext={handleNext}
            />
            {currentContent?.username &&
              user?.displayName &&
              currentContent.username.replace(/\s+/g, "") === user.displayName && (
                <div className="px-4 py-3 border-t border-[#E5E8EB] flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="sparkle-effect px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-full shadow-md border border-green-600/20">
                      ME
                    </span>
                    <span className="text-xs text-green-600 font-medium">내가 쓴 글</span>
                  </div>
                  <button
                    type="submit"
                    className={`${
                      currentContent.open
                        ? "sparkle-effect bg-[#2AC1BC] hover:bg-[#2AC1BC]/90 "
                        : "bg-gray"
                    }  text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 ml-auto`}
                    disabled={!currentContent.open}
                  >
                    공유하기
                  </button>
                </div>
              )}
          </div>

          {/* 고민 목록 */}
          <div className="space-y-4 mt-6">
            <CommentList
              mainContent={{
                id: currentContent.id,
                response: currentContent.response,
                date: currentContent.date,
                like: currentContent.like,
              }}
              comments={(currentContent.comments || [])
                .filter((comment): comment is Comment => comment.content !== undefined)}
              isPostLiked={postLikeStates[currentContent.id]}
              commentLikeStates={commentLikeStates}
              onTogglePostLike={() => handleTogglePostLike(currentContent.id)}
              onToggleCommentLike={(commentId) => handleToggleCommentLike(currentContent.id, commentId)}
              newComment={newComment}
              onCommentChange={setNewComment}
              onCommentSubmit={handleAddComment}
              isLoading={isLoading}
              formatDate={formatRelativeDate}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Advice;
