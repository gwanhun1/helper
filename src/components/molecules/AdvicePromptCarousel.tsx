import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Item } from "../../hooks/useContentsData";

interface AdvicePromptCarouselProps {
  prompts: Item[];
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
}

const AdvicePromptCarousel = ({
  prompts,
  onPrev,
  onNext,
  currentIndex,
}: AdvicePromptCarouselProps) => {
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    // 인덱스 업데이트는 부모에서만 처리 — 이중 업데이트 방지
    if (newDirection === 1) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <div className="flex w-full justify-between items-center py-3 px-1 overflow-hidden">
      <button
        onClick={() => paginate(-1)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10 shrink-0"
        aria-label="Previous prompt"
      >
        <IoIosArrowBack size={20} />
      </button>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.1 } }}
          className="flex-1 flex items-center justify-center px-2"
        >
          <p className="text-sm text-slate-700 text-center leading-relaxed">
            {prompts[currentIndex]?.content || "Loading..."}
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => paginate(1)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10 shrink-0"
        aria-label="Next prompt"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};

export default AdvicePromptCarousel;
