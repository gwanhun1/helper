import { motion, AnimatePresence } from "framer-motion";
import { useWorryPrompt } from "../../hooks/useWorryPrompt";
// import useWorryManager from "../../hooks/useWorryManager";

const WorryPromptCarousel = () => {
  const { currentPrompts, isTransitioning, handleSelection } = useWorryPrompt();
  // const { saveWorry } = useWorryManager();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 mx-4 bg-white rounded-[28px] p-7 shadow-[0_2px_16px_rgb(0,0,0,0.04)] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-50 to-transparent rounded-full -mr-16 -mt-16 opacity-40" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-50 to-transparent rounded-full -ml-10 -mb-10 opacity-30" />

      <div className="relative">
        {/* Label */}
        <div className="inline-flex items-center space-x-2 bg-[#40C057] rounded-full px-3 py-1 mb-4">
          <span className="text-white text-sm font-extrabold tracking-tight">
            AI 멘토
          </span>
        </div>

        {/* Main Content */}
        <div className="space-y-2">
          <h2 className="font-ibm text-[26px] font-black text-gray-900 tracking-tight leading-8">
            고민이 있으신가요?
          </h2>
          <p className="font-ibm text-[15px] text-gray-600 tracking-tight">
            AI와 함께 이야기해요
          </p>
        </div>

        {/* Carousel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPrompts.who.who}-${currentPrompts.how.how}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative mt-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/30 to-transparent" />
            <div className="relative h-10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
              <div className="absolute inset-x-0 bottom-0 h-[0.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />

              <div className="text-md font-medium text-gray-700 text-center px-2">
                {currentPrompts.who.text}
              </div>

              <span className="mx-2 text-gray-400">•</span>

              <div className="text-md font-medium text-gray-700 text-center px-2">
                {currentPrompts.how.text}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={handleSelection}
          whileHover={{ scale: isTransitioning ? 1 : 1.01 }}
          whileTap={{ scale: isTransitioning ? 1 : 0.99 }}
          disabled={isTransitioning}
          className={`w-full mt-4 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white text-xs font-medium py-3 px-3 rounded-xl shadow-sm hover:shadow sparkle-effect z-20 
            
          `}
        >
          바로 시작하기
        </motion.button>

        {/* Decorations */}
        <Decorations />
      </div>
    </motion.div>
  );
};

const Decorations = () => (
  <>
    <motion.div
      className="absolute -top-1 -right-1 mt-2 text-2xl"
      animate={{
        rotate: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🤗
    </motion.div>
    <motion.div
      className="absolute top-8 right-6 text-xl"
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      💝
    </motion.div>
    <motion.div
      className="absolute top-16 right-2 text-xl"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      💭
    </motion.div>
    <motion.div
      className="absolute -bottom-3 right-12 text-xl"
      animate={{
        rotate: [0, -10, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      🌟
    </motion.div>
  </>
);

export default WorryPromptCarousel;
