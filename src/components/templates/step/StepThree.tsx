import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import { howList } from "../../../constants/worryPrompts";
import { motion } from "framer-motion";

const StepThree = () => {
  const { increase, decrease } = useStepStore();
  const { setHow, how } = useWorryStore();

  const handleHowSelection = (how: string) => {
    setHow(how);
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
        <Title>어떤 말투로 조언해드릴까요?</Title>
        <Text variant="body" color="secondary" className="mt-2 font-medium">
          때로는 따뜻한 위로가, 때로는 냉철한 분석이 힘이 됩니다.
        </Text>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 px-6 overflow-y-auto pb-32"
      >
        <div className="grid grid-cols-2 gap-3 mt-4">
          {howList.map((button, index) => (
            <motion.div key={index} variants={item}>
              <Button
                onPress={() => handleHowSelection(button.how)}
                text={button.text}
                bgColor={how === button.how ? "bg-green" : "bg-green-100"}
                color={how === button.how ? "text-white" : "text-green-800"}
                outline={false}
                className={`w-full h-16 !rounded-2xl border ${how === button.how ? "border-green shadow-md shadow-green/20" : "border-green-200 shadow-sm"}`}
                fontSize={14}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-transparent z-20">
        <Button
          onPress={() => decrease()}
          text="이전으로"
          bgColor="bg-white/40"
          color="text-gray-600"
          className="w-full !rounded-2xl h-12"
          outline
        />
      </div>
    </div>
  );
};

export default StepThree;
