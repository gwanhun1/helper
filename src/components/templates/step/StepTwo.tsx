import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import { whoList } from "../../../constants/worryPrompts";

const StepTwo = () => {
  const { increase, decrease } = useStepStore();
  const { setWho, who } = useWorryStore();

  const handleWhoSelection = (who: string) => {
    setWho(who);
    increase();
  };

  return (
    <div className="p-2">
      <div className="px-2 pb-2 mb-4 border-b border-gray-300">
        <Title>누구에게 듣고싶나요?</Title>
        <Text className="px-2 mt-2 ml-2 text-xs text-gray-600">
          당신의 고민을 들어줄 대상을 골라주세요.
        </Text>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          onPress={() => decrease()}
          text="Back"
          color="#000"
          bgColor="bg-slate-100"
          outline
        />
        {whoList.map((button, index) => (
          <Button
            key={index}
            onPress={() => handleWhoSelection(button.who)}
            text={button.text}
            bgColor={who === button.who ? "bg-blue-800" : "bg-green-800"}
            className={who === button.who ? "sparkle-effect" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
