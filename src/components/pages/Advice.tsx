import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import PageLayout from "../organisms/PageLayout";
import AdvicePromptCarousel from "../molecules/AdvicePromptCarousel";
import useUserStore from "../../store/userStore";
import useContentsData from "../../hooks/useContentsData";
import useLikeManager from "../../hooks/useLikeManager";
import useCommentManager from "../../hooks/useCommentManager";

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

  const updateLikeStates = useCallback(async () => {
    if (!currentContent?.id || isLoading) return;

    setIsLoading(true);
    try {
      // 게시글 좋아요 상태 업데이트
      const isLiked = await isPostLiked(currentContent.id);
      setPostLikeStates(prev => ({ ...prev, [currentContent.id]: isLiked }));

      // 댓글들의 좋아요 상태를 Promise.all로 한 번에 처리
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
    if (!user?.uid || !newComment.trim() || !currentContent?.id) return;
    
    try {
      await addComment(currentContent.id, newComment.trim());
      setNewComment("");
      // 댓글이 추가된 후 좋아요 상태 업데이트
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
            <span className="text-[10px] text-[#666666] mb-1">
              함께 고민을 나눠요
            </span>
          </div>
        </div>

        {/* 메인 컨테이너 */}
        <div className="p-4 space-y-4">
          {/* 상단 배너 */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E8EB]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-[#2AC1BC] rounded-full flex items-center justify-center">
                <RiKakaoTalkFill className="text-white" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-[#333333]">
                  오늘의 고민 공유하기
                </h2>
                <p className="text-sm text-[#666666]">
                  다른 사람들과 고민을 나눠보세요
                </p>
              </div>
            </div>
          </div>

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
              currentContent.username.replace(/\s+/g, "") ===
                user.displayName && (
                <div className="px-4 py-3 border-t border-[#E5E8EB] flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-full shadow-md border border-green-600/20">
                      ME
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      내가 쓴 글
                    </span>
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
              <motion.div
                key={currentContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-2xl border border-[#E5E8EB]"
              >
                {/* 고민 헤더 */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <FaRobot className="text-[#666666] text-sm" />
                      </div>
                    </div>
                    <span className="text-xs text-[#999999]">
                      {currentContent.date}
                    </span>
                  </div>
                </div>

                {/* 고민 내용 */}
                <div className="ml-10">
                  <p className="text-[15px] text-[#333333] leading-relaxed mb-3">
                    {currentContent.response}
                  </p>

                  {/* 좋아요 버튼 */}
                  <button
                    onClick={() => handleTogglePostLike(currentContent.id)}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 text-[#666666]"
                  >
                    {postLikeStates[currentContent.id] ? (
                      <AiFillHeart className="text-[#FF3D3D]" size={18} />
                    ) : (
                      <AiOutlineHeart size={18} />
                    )}
                    <span className="text-sm">{currentContent.like || 0}</span>
                  </button>
                </div>

                {/* 답변 목록 */}
                <div className="space-y-3 mt-4 ml-10">
                  {(currentContent.comments || []).map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-[#F8F9FA] p-3.5 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs text-[#666666]">{reply.username || '익명'}</span>
                          </div>
                          <span className="text-xs text-[#999999]">
                            {reply.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] text-[#333333] ml-8">
                        {reply.content}
                      </p>
                      <div className="mt-2 ml-8">
                        <button 
                          onClick={() => {
                            if (currentContent?.id && reply?.id) {
                              handleToggleCommentLike(currentContent.id, reply.id);
                            }
                          }}
                          disabled={isLoading}
                          className="flex items-center gap-1.5 text-[#666666]"
                        >
                          {reply.id && commentLikeStates[reply.id] ? (
                            <AiFillHeart className="text-[#FF3D3D]" size={16} />
                          ) : (
                            <AiOutlineHeart size={16} />
                          )}
                          <span className="text-xs">{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 답변 입력 */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="따뜻한 답변을 남겨주세요"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E8EB] text-sm focus:outline-none focus:border-[#2AC1BC] placeholder:text-[#999999]"
                  />
                  <button 
                    onClick={handleAddComment}
                    disabled={isLoading}
                    className="text-[#2AC1BC] hover:text-[#2AC1BC]/80 p-2"
                  >
                    <FiSend size={20} />
                  </button>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Advice;
