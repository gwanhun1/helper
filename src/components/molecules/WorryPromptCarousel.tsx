import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStepStore from '../../store/stepStore';
import useWorryStore from '../../store/worryStore';

const whoList = [
  { who: "엄마", text: "엄마" },
  { who: "아빠", text: "아빠" },
  { who: "형/오빠", text: "형/오빠" },
  { who: "동생", text: "동생" },
  { who: "친구", text: "친구" },
  { who: "선생님", text: "선생님" },
  { who: "헬스트레이너", text: "헬스트레이너" },
  { who: "할머니", text: "할머니" },
  { who: "할아버지", text: "할아버지" },
  { who: "동네 아저씨", text: "동네 아저씨" },
  { who: "백수", text: "백수" },
  { who: "재벌 회장님", text: "재벌 회장님" },
  { who: "연예인", text: "연예인" },
  { who: "CEO", text: "CEO" },
  { who: "학생", text: "유치원생" },
  { who: "이웃", text: "백수 이웃" },
  { who: "미래 자녀", text: "자녀" },
  { who: "외계인", text: "외계인" },
  { who: "타임머신 타고 온 사람", text: "타임머신 타고 온 사람" },
  { who: "만화 캐릭터", text: "만화 캐릭터" },
  { who: "로봇", text: "로봇" },
  { who: "스파이", text: "괴물" },
  { who: "슈퍼히어로", text: "슈퍼히어로" },
  { who: "악당", text: "악당" },
  { who: "마법사", text: "마법사" },
  { who: "아이돌", text: "아이돌" },
  { who: "동화 속 캐릭터", text: "동화 속 캐릭터" }
];

const howList = [
  { how: "웃기게", text: "웃기게" },
  { how: "다정하게", text: "다정하게" },
  { how: "랩으로", text: "랩으로" },
  { how: "비아냥거리게", text: "비아냥거리게" },
  { how: "다급하게", text: "다급하게" },
  { how: "유머러스하게", text: "유머러스하게" },
  { how: "진지하게", text: "진지하게" },
  { how: "따뜻하게", text: "따뜻하게" },
  { how: "감성적으로", text: "감성적으로" }
];

const WorryPromptCarousel = () => {
  const { setStep } = useStepStore();
  const { setWho, setHow } = useWorryStore();
  const [whoIndex, setWhoIndex] = useState(0);
  const [howIndex, setHowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWhoIndex((prev) => (prev + 1) % whoList.length);
      setHowIndex((prev) => (prev + 1) % howList.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSelection = () => {
    setWho(whoList[whoIndex].who);
    setHow(howList[howIndex].how);
    setTimeout(() => {
      setStep(4);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-4 shadow-sm hover:shadow transition-all duration-300"
    >
      <div className="flex flex-col space-y-1">
        {/* Who Carousel */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/30 to-transparent" />
          <div className="relative h-10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
            <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
            <AnimatePresence mode="wait">
              <motion.div
                key={'who' + whoIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-lg font-medium text-gray-700 text-center px-2"
              >
                {whoList[whoIndex].text}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center opacity-30">
          <div className="w-6 h-[0.5px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        {/* How Carousel */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/30 to-transparent" />
          <div className="relative h-10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
            <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
            <AnimatePresence mode="wait">
              <motion.div
                key={'how' + howIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-lg font-medium text-gray-700 text-center px-2"
              >
                {howList[howIndex].text}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <motion.button
        onClick={handleSelection}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded transition-all duration-300 shadow-sm hover:shadow"
      >
        선택하기
      </motion.button>
    </motion.div>
  );
};

export default WorryPromptCarousel;
