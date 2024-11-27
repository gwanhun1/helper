import useStepStore from "../../../store/stepStore";
import TitleContainer from "../../atoms/TitleContainer";

const StepOne = () => {
  const { increase } = useStepStore();

  return (
    <div className="p-2">
      <TitleContainer
        title="어떤 조언을 듣고싶나요?"
        subtitle="당신의 고민을 적어주세요."
      />
      <div className="flex flex-col">
        {/* 1:7 비율 적용 */}

        <div className="bg-gray-300" style={{ height: "55vh" }}></div>
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
