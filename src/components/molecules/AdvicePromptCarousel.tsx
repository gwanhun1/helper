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
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
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
    <div className="relative h-12">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0 }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-sm text-[#333333] px-12">
              {prompts[currentIndex]?.content || "Loading..."}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 pointer-events-auto"
            aria-label="Previous prompt"
          >
            <IoIosArrowBack size={20} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 pointer-events-auto"
            aria-label="Next prompt"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvicePromptCarousel;
