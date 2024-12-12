import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import { howList } from "../../../constants/worryPrompts";

const StepThree = () => {
  const { increase, decrease } = useStepStore();
  const { setHow, how } = useWorryStore();

  const handleHowSelection = (how: string) => {
    setHow(how);
    increase();
  };

  return (
    <div className="p-2">
      <div className="px-2 pb-2 mb-4 border-b border-gray-300">
        <Title>어떻게 듣고싶나요?</Title>
        <Text className="px-2 mt-2 ml-2 text-xs text-gray-600">
          때로는 색다른 느낌의 조언이 힘이 됩니다.
        </Text>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          onPress={decrease}
          text="Back"
          color="#000"
          bgColor="bg-slate-100"
          outline
        />
        {howList.map((button, index) => (
          <Button
            key={index}
            onPress={() => handleHowSelection(button.how)}
            text={button.text}
            bgColor={how === button.how ? "bg-blue-500" : "bg-green"}
            className={how === button.how ? "sparkle-effect" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default StepThree;
