import { motion } from "framer-motion";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import PageLayout from "../organisms/PageLayout";
import AdvicePromptCarousel from "../molecules/AdvicePromptCarousel";
import useLogData from "../../hooks/useLogData";
import useUserStore from "../../store/userStore";

const Advice = () => {
  const { data } = useLogData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useUserStore((state) => state.user);

  const [worries, setWorries] = useState([
    {
      id: 1,
      content: "취업 준비하는데 너무 힘들어요...",
      likes: 5,
      isLiked: false,
      createdAt: "방금 전",
      replies: [
        {
          id: 1,
          content: "한 걸음씩 천천히 나아가보세요! 포기하지 마세요 💪",
          likes: 3,
          createdAt: "1시간 전",
        },
        {
          id: 2,
          content: "저도 같은 상황이에요. 함께 힘내봐요!",
          likes: 2,
          createdAt: "30분 전",
        },
      ],
    },
  ]);

  const toggleLike = (worryId: number) => {
    setWorries((prev) =>
      prev.map((worry) =>
        worry.id === worryId
          ? {
              ...worry,
              isLiked: !worry.isLiked,
              likes: worry.isLiked ? worry.likes - 1 : worry.likes + 1,
            }
          : worry
      )
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  console.log(data[currentIndex]);

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
              prompts={data}
              onPrev={handlePrev}
              onNext={handleNext}
            />
            {data[currentIndex]?.username &&
              user?.displayName &&
              data[currentIndex]?.username?.replace(/\s+/g, "") ===
                user?.displayName && (
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
                      data[currentIndex]?.open
                        ? "sparkle-effect bg-[#2AC1BC] hover:bg-[#2AC1BC]/90 "
                        : "bg-gray"
                    }  text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 ml-auto`}
                    disabled={!data[currentIndex]?.open}
                  >
                    공유하기
                  </button>
                </div>
              )}
          </div>

          {/* 고민 목록 */}
          <div className="space-y-4 mt-6">
            {worries.map((worry) => (
              <motion.div
                key={worry.id}
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
                      {worry.createdAt}
                    </span>
                  </div>
                </div>

                {/* 고민 내용 */}
                <div className="ml-10">
                  <p className="text-[15px] text-[#333333] leading-relaxed mb-3">
                    {worry.content}
                  </p>

                  {/* 좋아요 버튼 */}
                  <button
                    onClick={() => toggleLike(worry.id)}
                    className="flex items-center gap-1.5 text-[#666666]"
                  >
                    {worry.isLiked ? (
                      <AiFillHeart className="text-[#FF3D3D]" size={18} />
                    ) : (
                      <AiOutlineHeart size={18} />
                    )}
                    <span className="text-sm">{worry.likes}</span>
                  </button>
                </div>

                {/* 답변 목록 */}
                <div className="space-y-3 mt-4 ml-10">
                  {worry.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-[#F8F9FA] p-3.5 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs text-[#666666]">익명</span>
                          </div>
                          <span className="text-xs text-[#999999]">
                            {reply.createdAt}
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] text-[#333333] ml-8">
                        {reply.content}
                      </p>
                      <div className="mt-2 ml-8">
                        <button className="flex items-center gap-1.5 text-[#666666]">
                          <AiOutlineHeart size={16} />
                          <span className="text-xs">{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 답변 입력 */}
                <div className="mt-4 flex gap-2 ">
                  <input
                    type="text"
                    placeholder="따뜻한 답변을 남겨주세요"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E8EB] text-sm focus:outline-none focus:border-[#2AC1BC] placeholder:text-[#999999]"
                  />
                  <button className="text-[#2AC1BC] hover:text-[#2AC1BC]/80 p-2">
                    <FiSend size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Advice;
