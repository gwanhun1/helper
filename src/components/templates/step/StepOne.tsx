import useStepStore from "../../../store/stepStore";
import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import Forest from "../../organisms/Forest";
import ForestLog from "../../organisms/ForestLog";
import { motion } from "framer-motion";

const StepOne = () => {
  const { increase } = useStepStore();

  return (
    <div className="p-2 h-full relative">
      <div className="h-full flex flex-col">
        <div className="px-2 sm:px-4 md:px-6 border-b border-gray-300">
          <Title>당신의 이야기를 나무로 심어보세요</Title>
          <Text className="px-2 mt-1 sm:mt-2 md:mt-3 ml-0 sm:ml-1 md:ml-2 text-[10px] sm:text-xs md:text-sm text-gray-600">
            고민을 나누면 작은 나무가 자라날 거예요
          </Text>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 pb-2">
          <Forest />
          <ForestLog />
        </div>
      </div>

      <motion.div 
        className="flex items-center justify-center backdrop-blur-sm z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.button
          className="flex items-center justify-center w-60 p-5 bg-green-600 shadow-lg rounded-xl relative overflow-hidden group"
          onClick={() => increase()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            initial={{ opacity: 0 }}
            whileTap={{ opacity: 0.2 }}
          />
          <span className="text-white truncate relative z-10">새로운 고민 시작하기</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StepOne;
