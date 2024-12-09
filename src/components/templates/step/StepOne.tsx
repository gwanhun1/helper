import useStepStore from "../../../store/stepStore";
import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import Forest from "../../organisms/Forest";
import ForestLog from "../../organisms/ForestLog";

const StepOne = () => {
  const { increase } = useStepStore();

  return (
    <div className="p-2 h-full relative">
      <div className="h-full flex flex-col">
        <div className="px-2 sm:px-4 md:px-6 border-b border-gray-300">
          <Title>당신의 이야기를 나무로 심어보세요</Title>
          <Text className="px-2 mt-1 sm:mt-2 md:mt-3 ml-0 sm:ml-1 md:ml-2 text-[10px] sm:text-xs md:text-sm text-gray-600">
            고민을 나누면 작은 나무가 자라날 거예요
          </Text>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0 pb-24">
          <Forest />
          <ForestLog />
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-20 flex items-center justify-center py-4 backdrop-blur-sm z-20 ">
        <button
          className="flex items-center justify-center w-60 p-5 bg-green-400 shadow-lg rounded-xl"
          onClick={() => increase()}
        >
          <span className="text-white truncate">Start</span>
        </button>
      </div>
    </div>
  );
};

export default StepOne;
