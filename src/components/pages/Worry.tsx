import {
  StepFive,
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
} from "../templates/step";
import useStepStore from "../../store/stepStore";
import { motion, AnimatePresence } from "framer-motion";

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="px-6 py-4 flex items-center justify-between relative">
      <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gray-200 -translate-y-1/2 overflow-hidden rounded-full">
        <motion.div 
          className="h-full bg-green"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="relative z-10">
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
              s <= currentStep ? "bg-green border-green" : "bg-white border-gray-300"
            }`}
            animate={{
              scale: s === currentStep ? 1.4 : 1,
              boxShadow: s === currentStep ? "0 0 12px rgba(122, 196, 167, 0.4)" : "none"
            }}
          />
        </div>
      ))}
    </div>
  );
};

const Worry = () => {
  const { step } = useStepStore();

  const stepFrom: { [key: number]: JSX.Element } = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <StepFour />,
    5: <StepFive />,
  };

  return (
    <div className="h-full flex flex-col bg-[#FDFDFD] relative overflow-hidden">
      {/* 배경 앰비언트 글로우 */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-green-100 rounded-full blur-[80px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      {/* 단계 표시기 */}
      <StepIndicator currentStep={step} />

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {stepFrom[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Worry;
