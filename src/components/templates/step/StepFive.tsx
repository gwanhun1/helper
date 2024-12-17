import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";

const StepFive = () => {
  const { reset, decrease } = useStepStore();
  const { response, reset: resetWorry } = useWorryStore();

  const handleReset = () => {
    resetWorry();
    reset();
  };

  return (
    <div className="p-2">
      <div className="px-2 pb-2 mb-4 border-b border-gray-300">
        <Title>조언이 도착했습니다.</Title>
      </div>

      <div className="flex flex-col">

        <div className="bg-gray-100" style={{ height: "60vh" }}>
          {response}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3 " style={{ height: "5vh" }}>
          <Button
            text="Back"
            bgColor="bg-green"
            onPress={() => decrease()}
          />
          <Button text="retry" bgColor="bg-gray-400" onPress={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default StepFive;
