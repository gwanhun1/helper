import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Item } from "../../hooks/useContentsData";

interface AdvicePromptCarouselProps {
  prompts: Item[];
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const AdvicePromptCarousel = ({
  prompts,
  onPrev,
  onNext,
  currentIndex,
  setCurrentIndex,
}: AdvicePromptCarouselProps) => {
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return prompts.length - 1;
      if (nextIndex >= prompts.length) return 0;
      return nextIndex;
    });
    if (newDirection === 1) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <div className="min-h-20 flex w-full justify-between items-center"  >

<button
      onClick={() => paginate(-1)}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10 h-8"
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
      transition={{
        opacity: { duration: 0 },
      }}
      className="flex items-center justify-center px-12"
    >
      <div className="text-sm text-[#333333] text-center flex items-center justify-center  h-8">
        {prompts[currentIndex]?.content || "Loading..."}
      </div>
    </motion.div>
  </AnimatePresence>

  <button
      onClick={() => paginate(1)}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
      aria-label="Next prompt"
    >
      <IoIosArrowForward size={20} />
    </button>
</div>
  );
};

export default AdvicePromptCarousel;
