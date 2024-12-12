import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface AdvicePromptCarouselProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

const AdvicePromptCarousel = ({ prompts, onSelect, onPrev, onNext }: AdvicePromptCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return prompts.length - 1;
      if (nextIndex >= prompts.length) return 0;
      return nextIndex;
    });
    if (newDirection > 0) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <div className="relative min-h-[120px] flex flex-col overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full px-4"
        >
          <div
            onClick={() => onSelect(prompts[currentIndex])}
            className="bg-white p-4 rounded-lg cursor-pointer min-h-[120px] flex items-center justify-center text-center"
          >
            {prompts[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 pb-2">
        <button
          onClick={() => paginate(-1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
          aria-label="Previous prompt"
        >
          <IoIosArrowBack size={16} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
          aria-label="Next prompt"
        >
          <IoIosArrowForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default AdvicePromptCarousel;
