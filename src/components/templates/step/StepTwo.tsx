import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import { whoList } from "../../../constants/worryPrompts";
import { motion } from "framer-motion";

const StepTwo = () => {
  const { increase, decrease } = useStepStore();
  const { setWho, who } = useWorryStore();

  const handleWhoSelection = (who: string) => {
    setWho(who);
    increase();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="px-6 pt-6 pb-4">
        <Title>누구에게 고민을 말해볼까요?</Title>
        <Text variant="body" color="secondary" className="mt-2 font-medium">
          당신의 마음을 가장 잘 이해해줄 대상을 골라주세요.
        </Text>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 px-6 overflow-y-auto pb-32"
      >
        <div className="grid grid-cols-2 gap-3 mt-4">
          {whoList.map((button, index) => (
            <motion.div key={index} variants={item}>
              <Button
                onPress={() => handleWhoSelection(button.who)}
                text={button.text}
                bgColor={who === button.who ? "bg-green" : "bg-green-100"}
                color={who === button.who ? "text-white" : "text-green-800"}
                outline={false}
                className={`w-full h-16 !rounded-2xl border ${who === button.who ? "border-green shadow-md shadow-green/20" : "border-green-200 shadow-sm"}`}
                fontSize={14}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-transparent z-20">
        <Button 
              text="이전으로" 
              bgColor="bg-white/40" 
              color="text-gray-600"
              onPress={decrease} 
              className="w-full !rounded-2xl h-14"
              outline
            />
      </div>
    </div>
  );
};

export default StepTwo;
