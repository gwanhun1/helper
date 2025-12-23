import useStepStore from "../../../store/stepStore";
import useUIStore from "../../../store/uiStore";
import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import Forest from "../../organisms/Forest";
import ForestLog from "../../organisms/ForestLog";
import { motion } from "framer-motion";

const StepOne = () => {
  const { increase } = useStepStore();
  const { showWeatherEffect, toggleWeatherEffect } = useUIStore();

  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden">
      <div className="flex-grow flex flex-col min-h-0">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-6 pb-4"
        >
          <Title>마음의 숲에 오신 것을 환영해요</Title>
          <div className="flex items-center justify-between mt-2">
            <Text variant="caption" color="secondary" className="font-medium">
              고민을 나누면 예쁜 나무가 자라날 거예요
            </Text>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleWeatherEffect}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                showWeatherEffect 
                ? "bg-indigo-50 text-indigo-500 shadow-sm border border-indigo-100" 
                : "bg-gray-100 text-gray-400 border border-gray-200"
              }`}
            >
              <span>{showWeatherEffect ? "✨ 비주얼 On" : "✨ 비주얼 Off"}</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="flex-[1.4] relative min-h-0">
          <Forest />
        </div>

        <div className="flex-1 flex flex-col px-4 pb-2 min-h-0">
          <ForestLog />
        </div>
      </div>

      <motion.div
        className="px-6 py-4 bg-transparent mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          className="sparkle-effect w-full py-4 bg-green shadow-xl shadow-green/10 rounded-2xl relative overflow-hidden group transition-all active:scale-95"
          onClick={() => increase()}
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-white font-bold text-base relative z-10 transition-transform group-hover:scale-110 block">
            나의 고민 심어보기
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StepOne;
