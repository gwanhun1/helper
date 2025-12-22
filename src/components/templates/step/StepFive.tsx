import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import { motion } from "framer-motion";

const StepFive = () => {
  const { reset, decrease } = useStepStore();
  const { response, reset: resetWorry } = useWorryStore();

  const handleReset = () => {
    resetWorry();
    reset();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-transparent px-6 pt-6 pb-8"
    >
      <div className="pb-6">
        <Title>당신을 위한 조언이 도착했어요</Title>
        <Text variant="body" color="secondary" className="mt-2 font-medium">
          이 메시지가 당신의 마음에 작은 위로가 되길 바라요.
        </Text>
      </div>

      <div className="flex-1 overflow-y-auto px-1">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100/50 shadow-sm relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100/30 rounded-full blur-2xl -mr-10 -mt-10" />
          
          <div className="relative z-10 text-gray-700 leading-loose text-[15px] whitespace-pre-wrap font-medium">
            {response}
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-4 bg-transparent -mx-6 -mb-8 mt-8 z-20">
        <div className="grid grid-cols-2 gap-4">
          <Button
            text="이전으로"
            bgColor="bg-white/40"
            color="text-gray-600"
            onPress={() => decrease()}
            className="h-14 !rounded-2xl"
            outline
          />
          <Button 
            className="sparkle-effect h-14 !rounded-2xl !shadow-green/20" 
            text="다시 심기" 
            bgColor="bg-green" 
            onPress={handleReset} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StepFive;
