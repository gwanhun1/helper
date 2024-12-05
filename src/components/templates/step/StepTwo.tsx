import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";

const StepTwo = () => {
  const { increase, decrease } = useStepStore();
  const { setWho } = useWorryStore();

  const handleWhoSelection = (who: string) => {
    setWho(who);
    increase();
  };

  const characterButtons = [
    { who: "엄마", text: "엄마" },
    { who: "아빠", text: "아빠" },
    { who: "형/오빠", text: "형/오빠" },
    { who: "동생", text: "동생" },
    { who: "친구", text: "친구" },
    { who: "선생님", text: "선생님" },
    { who: "헬스트레이너", text: "헬스트레이너" },
    { who: "할머니", text: "할머니" },
    { who: "할아버지", text: "할아버지" },
    { who: "동네 아저씨", text: "동네 아저씨" },
    { who: "백수", text: "백수" },
    { who: "재벌 회장님", text: "재벌 회장님" },
    { who: "연예인", text: "연예인" },
    { who: "CEO", text: "CEO" },
    { who: "학생", text: "유치원생" },
    { who: "이웃", text: "백수 이웃" },
    { who: "미래 자녀", text: "자녀" },
    { who: "외계인", text: "외계인" },
    { who: "타임머신 타고 온 사람", text: "타임머신 타고 온 사람" },
    { who: "만화 캐릭터", text: "만화 캐릭터" },
    { who: "로봇", text: "로봇" },
    { who: "스파이", text: "괴물" },
    { who: "슈퍼히어로", text: "슈퍼히어로" },
    { who: "악당", text: "악당" },
    { who: "마법사", text: "마법사" },
    { who: "아이돌", text: "아이돌" },
    { who: "동화 속 캐릭터", text: "동화 속 캐릭터" },
  ];

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
        {characterButtons.map((button, index) => (
          <Button
            key={index}
            onPress={() => handleWhoSelection(button.who)}
            text={button.text}
            bgColor="bg-green-700"
          />
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
