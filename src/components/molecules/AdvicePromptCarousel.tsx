import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Item } from "../../hooks/useContentsData";
// import useLikeManager from "../../hooks/useLikeManager";
// import useCommentManager from "../../hooks/useCommentManager";

interface AdvicePromptCarouselProps {
  prompts: Item[];
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AdvicePromptCarousel = ({
  prompts,
  onPrev,
  onNext,
  currentIndex,
  setCurrentIndex,
}: AdvicePromptCarouselProps) => {
  const [direction, setDirection] = useState(0);
  // const { togglePostLike, isPostLiked } = useLikeManager();
  // const { addComment } = useCommentManager();

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 1.05,
    },
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
    <div className="relative flex flex-col">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.3, ease: "easeInOut" },
            scale: { duration: 0.3, ease: "easeInOut" },
            height: { type: "spring", stiffness: 70, damping: 15, mass: 0.3 },
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
          className="w-full px-4 mb-12"
          layout
        >
          <motion.div
            layout
            className="px-4 pt-4 min-h-20 rounded-lg cursor-pointer flex items-center justify-center text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.2, ease: "easeInOut" },
              }}
            >
              {prompts[currentIndex]?.content}
            </motion.span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -bottom-2 left-0 right-0 flex justify-between items-center px-8 pb-4 z-10">
        <button
          onClick={() => paginate(-1)}
          className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md"
          aria-label="Previous prompt"
        >
          <IoIosArrowBack size={18} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md"
          aria-label="Next prompt"
        >
          <IoIosArrowForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default AdvicePromptCarousel;
