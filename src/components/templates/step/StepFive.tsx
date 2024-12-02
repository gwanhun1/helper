import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import TitleContainer from "../../atoms/TitleContainer";

const StepFive = () => {
  const { reset, decrease } = useStepStore();
  const { worry } = useWorryStore();

  return (
    <div className="p-2">
      <TitleContainer title="조언이 도착했습니다." />

      <div className="flex flex-col">
        {/* 1:7 비율 적용 */}

        <div className="bg-gray-300" style={{ height: "60vh" }}>
          {worry}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3 " style={{ height: "5vh" }}>
          <Button
            text="Back"
            bgColor="bg-green-400"
            onPress={() => decrease()}
          />
          <Button text="retry" bgColor="bg-gray-400" onPress={() => reset()} />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
