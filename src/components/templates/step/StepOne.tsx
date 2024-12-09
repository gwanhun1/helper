import useStepStore from "../../../store/stepStore";
import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import HowScrollButtons from "../../molecules/HowScrollButtons";
import WhoScrollButtons from "../../molecules/WhoScrollButtons";

const StepOne = () => {
  const { increase } = useStepStore();

  return (
    <div className="p-2">
      <div className="px-2 pb-2 mb-4 border-b border-gray-300">
          <Title>어떤 조언을 듣고싶나요?</Title>
          <Text className="px-2 mt-2 ml-2 text-xs text-gray-600">
          당신의 고민을 적어주세요
          </Text>
        </div>
      <div className="flex flex-col">

        <div style={{ height: "55vh" }}>
          <WhoScrollButtons/>
          <HowScrollButtons/>
          <WhoScrollButtons/>
          <HowScrollButtons/>

        </div>
        <div
          className="flex items-center justify-center w-full "
          style={{ height: "10vh" }}
        >
          <button
            className="flex items-center justify-center w-full p-5 mt-1 bg-green-400 shadow-lg rounded-xl "
            onClick={() => increase()}
          >
            <span className="text-white truncate">Start</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
