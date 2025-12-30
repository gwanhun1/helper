import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/loading.json";
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ textStep }: { textStep: number }) => {
  const TextArea = [
    { text: "조언자를 모셔오고 있어요", emoji: "😌" },
    { text: "깊은 고민에 빠져들고 있어요", emoji: "🤔" },
    { text: "당신만을 위한 위로를 적는 중", emoji: "✍️" },
    { text: "따뜻한 조언이 곧 도착해요", emoji: "✨" },
  ];

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm px-6 overflow-hidden">
      <div className="flex flex-col justify-center items-center -translate-y-12">
        <div className="flex relative justify-center items-center w-64 h-64">
          {/* 배경 글로우 효과 */}
          <div className="absolute inset-0 bg-green-100 rounded-full opacity-30 blur-3xl animate-pulse" />
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="relative z-10 w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-8 h-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={textStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3 items-center"
            >
              <span className="text-3xl">{TextArea[textStep].emoji}</span>
              <p className="text-lg font-bold tracking-tight text-slate-700">
                {TextArea[textStep].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green"
            animate={{
              x: [-192, 192],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
