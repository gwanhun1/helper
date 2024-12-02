import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import TitleContainer from "../../atoms/TitleContainer";

const StepThree = () => {
  const { increase, decrease } = useStepStore();
  const { setHow } = useWorryStore();

  const handleHowSelection = (how: string) => {
    setHow(how);
    increase();
  };

  const howButtons = [
    { how: "웃기게", text: "웃기게" },
    { how: "다정하게", text: "다정하게" },
    { how: "랩으로", text: "랩으로" },
    { how: "비아냥거리게", text: "비아냥거리게" },
    { how: "다급하게", text: "다급하게" },
    { how: "유머러스하게", text: "유머러스하게" },
    { how: "진지하게", text: "진지하게" },
    { how: "따뜻하게", text: "따뜻하게" },
    { how: "감성적으로", text: "감성적으로" },
  ];

  return (
    <div className="p-2">
      <TitleContainer
        title="어떻게 듣고싶나요?"
        subtitle="때로는 색다른 느낌의 조언이 힘이 됩니다."
      />
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          onPress={decrease}
          text="Back"
          color="#000"
          bgColor="bg-slate-100"
          outline
        />
        {howButtons.map((button, index) => (
          <Button
            key={index}
            onPress={() => handleHowSelection(button.how)}
            text={button.text}
            bgColor="bg-green-400"
          />
        ))}
      </div>
    </div>
  );
};

export default StepThree;
