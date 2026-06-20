/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { formatRelativeDate } from "../../utils/date";

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
  who?: string;
}

const Advice = () => {
  const { data: contentsData = [], loading: dataLoading } = useContentsData();
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
  const [postLikeStates, setPostLikeStates] = useState<{ [key: string]: boolean }>({});
  const [commentLikeStates, setCommentLikeStates] = useState<{ [key: string]: boolean }>({});
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 좋아요 상태 로컬 캐시 — postId별로 저장해 스와이프 시 중복 호출 방지
  const likeCache = useRef<{ [postId: string]: { post: boolean; comments: { [id: string]: boolean } } }>({});

  const currentContent = contentsData[currentIndex] || null;
  const isUpdatingRef = useRef(false);

  const updateLikeStates = useCallback(async () => {
    if (!currentContent?.id || isUpdatingRef.current) return;

    // 캐시 히트 — Firebase 호출 생략
    if (likeCache.current[currentContent.id]) {
      const cached = likeCache.current[currentContent.id];
      setPostLikeStates((prev) => ({ ...prev, [currentContent.id]: cached.post }));
      setCommentLikeStates((prev) => ({ ...prev, ...cached.comments }));
      return;
    }

    isUpdatingRef.current = true;
    setIsUpdatingLikes(true);
    try {
      const isLiked = await isPostLiked(currentContent.id);
      setPostLikeStates((prev) => ({ ...prev, [currentContent.id]: isLiked }));

      const commentResults: { [id: string]: boolean } = {};
      if (currentContent.comments && Array.isArray(currentContent.comments)) {
        const commentPromises = currentContent.comments
          .filter((comment): comment is { id: string } => Boolean(comment?.id))
          .map(async (comment) => {
            const liked = await isCommentLiked(currentContent.id, comment.id);
            return [comment.id, liked] as [string, boolean];
          });
        const results = await Promise.all(commentPromises);
        results.forEach(([id, liked]) => { commentResults[id] = liked; });
        setCommentLikeStates((prev) => ({ ...prev, ...commentResults }));
      }

      // 캐시 저장
      likeCache.current[currentContent.id] = { post: isLiked, comments: commentResults };
    } catch (error) {
      console.error("Error updating like states:", error);
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
    if (!user?.uid) { toast.error("로그인이 필요합니다."); return; }
    if (!newComment.trim()) { toast.error("댓글 내용을 입력해주세요."); return; }
    if (!currentContent?.id) return;
    try {
      const success = await addComment(currentContent.id, newComment.trim());
      if (success) {
        setNewComment("");
        toast.success("댓글이 작성되었습니다.");
        // 캐시 무효화 후 재조회
        delete likeCache.current[currentContent.id];
        updateLikeStates();
      }
    } catch {
      toast.error("댓글 작성에 실패했습니다.");
    }
  }, [user?.uid, newComment, currentContent?.id, addComment, updateLikeStates]);

  const handleTogglePostLike = useCallback(async (postId: string) => {
    if (!postId) return;
    try {
      await togglePostLike(postId);
      const newState = await isPostLiked(postId);
      setPostLikeStates((prev) => ({ ...prev, [postId]: newState }));
      if (likeCache.current[postId]) likeCache.current[postId].post = newState;
    } catch (error) {
      console.error("Error toggling post like:", error);
    }
  }, [togglePostLike, isPostLiked]);

  const handleToggleCommentLike = useCallback(async (postId: string, commentId: string) => {
    if (!postId || !commentId) return;
    try {
      await toggleCommentLike(postId, commentId);
      const newState = await isCommentLiked(postId, commentId);
      setCommentLikeStates((prev) => ({ ...prev, [commentId]: newState }));
      if (likeCache.current[postId]) likeCache.current[postId].comments[commentId] = newState;
    } catch (error) {
      console.error("Error toggling comment like:", error);
    }
  }, [toggleCommentLike, isCommentLiked]);

  const handleDeleteComment = useCallback(async (commentId: string) => {
    if (!currentContent?.id || !commentId) return;
    try {
      const success = await deleteComment(currentContent.id, commentId);
      if (success) {
        toast.success("댓글이 삭제되었습니다.");
        delete likeCache.current[currentContent.id];
      }
    } catch {
      toast.error("댓글 삭제에 실패했습니다.");
    }
  }, [currentContent?.id, deleteComment]);

  const handleDeletePost = useCallback(async () => {
    if (!currentContent?.id) return;
    try {
      const idToDelete = currentContent.id;
      await deleteData(idToDelete);
      toast.success("고민이 삭제되었습니다.");
      setShowDeleteConfirm(false);
      if (contentsData.length <= 1) {
        setCurrentIndex(0);
      } else if (currentIndex >= contentsData.length - 1) {
        setCurrentIndex(contentsData.length - 2);
      }
    } catch {
      toast.error("삭제에 실패했습니다.");
    }
  }, [currentContent?.id, deleteData, currentIndex, contentsData]);

  // 로딩 중
  if (dataLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-full">
          <div className="text-slate-400 text-sm">불러오는 중...</div>
        </div>
      </PageLayout>
    );
  }

  // 빈 상태
  if (!currentContent) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
          <span className="text-5xl">💬</span>
          <p className="text-base font-bold text-slate-700">아직 공유된 고민이 없어요</p>
          <p className="text-sm text-slate-400">먼저 고민을 나눠보세요!</p>
        </div>
      </PageLayout>
    );
  }

  const isMyPost =
    currentContent?.username &&
    user?.displayName &&
    currentContent.username.replace(/\s+/g, "") === user.displayName;

  return (
    <PageLayout>
      {/* 인앱 삭제 확인 모달 */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/30 pb-8"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl mx-4 p-5 w-full max-w-sm shadow-xl"
            >
              <p className="text-base font-bold text-slate-800 mb-1">고민을 삭제할까요?</p>
              <p className="text-sm text-slate-400 mb-5">삭제하면 복구할 수 없어요.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleDeletePost}
                  disabled={deleteLoading}
                  className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold text-sm disabled:opacity-60"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-slate-100 pb-4 min-h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative px-5 py-3 bg-white border-b border-slate-100">
          <div className="flex gap-3 items-end">
            <h1 className="text-xl font-bold text-slate-800">고민나누기</h1>
            <span className="text-[10px] text-slate-400 mb-1">함께 고민을 나눠요</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <AdviceBanner />

          <div className="bg-white rounded-2xl border border-slate-200">
            <AnimatePresence mode="wait" custom={swipeDirection}>
              <AdvicePromptCarousel
                currentIndex={currentIndex}
                prompts={contentsData}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </AnimatePresence>

            {isMyPost && (
              <div className="px-4 py-3 border-t border-slate-100 flex justify-between items-center bg-white rounded-b-2xl">
                <div className="flex gap-1 items-center">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-full text-xs">
                    ME
                  </span>
                  <span className="text-xs font-medium text-green-600">내가 쓴 글</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                    ✓ 공유됨
                  </span>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={deleteLoading}
                    className="p-2 text-slate-400 bg-slate-50 rounded-lg transition-colors hover:text-rose-500"
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
              isLoggedIn={!!user}
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
              isLoading={likeLoading || commentLoading || isUpdatingLikes}
              formatDate={formatRelativeDate}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Advice;
