/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import PageLayout from "../organisms/PageLayout";
import AdvicePromptCarousel from "../molecules/AdvicePromptCarousel";
import AdviceBanner from "../organisms/AdviceBanner";
import CommentList from "../organisms/CommentList";
import useUserStore from "../../store/userStore";
import useContentsData from "../../hooks/useContentsData";
import useLikeManager from "../../hooks/useLikeManager";
import useCommentManager from "../../hooks/useCommentManager";
import useDeleteData from "../../hooks/useDeleteData";
import { toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

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
  const {
    togglePostLike,
    toggleCommentLike,
    isPostLiked,
    isCommentLiked,
    loading: likeLoading,
  } = useLikeManager();
  const {
    addComment,
    deleteComment,
    loading: commentLoading,
  } = useCommentManager();
  const { deleteData, loading: deleteLoading } = useDeleteData();
  const [newComment, setNewComment] = useState("");
  const [postLikeStates, setPostLikeStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [commentLikeStates, setCommentLikeStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const currentContent = contentsData[currentIndex] || null;
  const isUpdatingRef = useRef(false);

  const formatRelativeDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";

    try {
      let date: Date;

      date = new Date(dateStr);

      if (isNaN(date.getTime()) && dateStr.includes("/")) {
        const dateParts = dateStr.split("/");
        if (dateParts.length === 3) {
          const [month, day, year] = dateParts;
          date = new Date(
            `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
          );
        }
      }

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
        return date.toISOString().split("T")[0];
      }
    } catch (error) {
      console.error("Date parsing error:", error);
      return dateStr || "";
    }
  };

  const updateLikeStates = useCallback(async () => {
    if (!currentContent?.id || isUpdatingRef.current) return;

    isUpdatingRef.current = true;
    setIsUpdatingLikes(true);
    try {
      const isLiked = await isPostLiked(currentContent.id);
      setPostLikeStates((prev) => ({ ...prev, [currentContent.id]: isLiked }));

      if (currentContent.comments && Array.isArray(currentContent.comments)) {
        const commentPromises = currentContent.comments
          .filter((comment): comment is { id: string } => Boolean(comment?.id))
          .map(async (comment) => {
            const isCommentLikedState = await isCommentLiked(
              currentContent.id,
              comment.id
            );
            return [comment.id, isCommentLikedState];
          });

        const results = await Promise.all(commentPromises);
        const newCommentStates = Object.fromEntries(results);
        setCommentLikeStates((prev) => ({ ...prev, ...newCommentStates }));
      }
    } catch (error) {
      console.error("Error updating like states:", error);
    } finally {
      setIsUpdatingLikes(false);
      isUpdatingRef.current = false;
    }
  }, [
    currentContent?.id,
    currentContent?.comments,
    isPostLiked,
    isCommentLiked,
  ]);

  useEffect(() => {
    updateLikeStates();
  }, [currentContent?.id]);

  const handlePrev = useCallback(() => {
    setSwipeDirection("right");
    setCurrentIndex(
      (prev) => (prev - 1 + contentsData.length) % contentsData.length
    );
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

  const handleTogglePostLike = useCallback(
    async (postId: string) => {
      if (!postId) return;

      try {
        await togglePostLike(postId);
        const newState = await isPostLiked(postId);
        setPostLikeStates((prev) => ({ ...prev, [postId]: newState }));
      } catch (error) {
        console.error("Error toggling post like:", error);
      }
    },
    [togglePostLike, isPostLiked]
  );

  const handleToggleCommentLike = useCallback(
    async (postId: string, commentId: string) => {
      if (!postId || !commentId) return;

      try {
        await toggleCommentLike(postId, commentId);
        const newState = await isCommentLiked(postId, commentId);
        setCommentLikeStates((prev) => ({ ...prev, [commentId]: newState }));
      } catch (error) {
        console.error("Error toggling comment like:", error);
      }
    },
    [toggleCommentLike, isCommentLiked]
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!currentContent?.id || !commentId) return;

      try {
        const success = await deleteComment(currentContent.id, commentId);
        if (success) {
          toast.success("댓글이 삭제되었습니다.");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        toast.error("댓글 삭제에 실패했습니다.");
      }
    },
    [currentContent?.id, deleteComment]
  );

  const handleDeletePost = useCallback(async () => {
    if (!currentContent?.id) return;

    if (window.confirm("정말 이 고민을 삭제하시겠습니까?")) {
      try {
        const idToDelete = currentContent.id;
        await deleteData(idToDelete);
        toast.success("고민이 삭제되었습니다.");

        // 삭제 후 인덱스 조정
        if (contentsData.length <= 1) {
          // 마지막 글인 경우
          setCurrentIndex(0);
        } else if (currentIndex >= contentsData.length - 1) {
          // 마지막 인덱스 글을 삭제한 경우 이전 글로 이동
          setCurrentIndex(contentsData.length - 2);
        }
        // 그 외의 경우(중간 글 삭제)는 다음 글이 자동으로 해당 인덱스로 올라옴
      } catch (error) {
        console.error("Failed to delete post:", error);
        toast.error("삭제에 실패했습니다.");
      }
    }
  }, [currentContent?.id, deleteData, currentIndex, contentsData]);

  if (!currentContent) {
    return (
      <PageLayout requireAuth>
        <div className="flex justify-center items-center h-full">
          <p>데이터를 불러오는 중입니다...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout requireAuth>
      <div className="bg-[#F2F4F6] pb-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative px-5 py-3 bg-white border-b">
          <div className="flex gap-3 items-end">
            <h1 className="text-xl font-bold text-[#333333]">고민나누기</h1>
            <span className="text-[10px] text-[#666666] mb-1">
              함께 고민을 나눠요
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <AdviceBanner />
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E8EB]">
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
              currentContent.username.replace(/\s+/g, "") ===
                user.displayName && (
                <div className="px-4 py-3 border-t border-[#E5E8EB] flex justify-between items-center bg-white rounded-b-2xl">
                  <div className="flex gap-1 items-center">
                    <span className="sparkle-effect px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-full shadow-md border border-green-600/20">
                      ME
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      내가 쓴 글
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                      ✓ 공유됨
                    </span>
                    <button
                      onClick={handleDeletePost}
                      disabled={deleteLoading}
                      className="p-2 text-gray-400 bg-gray-50 rounded-lg transition-colors hover:text-rose-500"
                      title="게시글 삭제"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
          </div>

          <div className="mt-6 space-y-4">
            <CommentList
              mainContent={{
                id: currentContent.id,
                response: currentContent.response,
                date: currentContent.date,
                like: currentContent.like,
                who: currentContent.who,
              }}
              comments={(currentContent.comments || []).filter(
                (comment): comment is Comment => comment.content !== undefined
              )}
              isPostLiked={postLikeStates[currentContent.id]}
              commentLikeStates={commentLikeStates}
              currentUsername={user?.displayName || undefined}
              onTogglePostLike={() => handleTogglePostLike(currentContent.id)}
              onToggleCommentLike={(commentId) =>
                handleToggleCommentLike(currentContent.id, commentId)
              }
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
