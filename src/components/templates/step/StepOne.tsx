import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import useUIStore from "../../../store/uiStore";
import Forest from "../../organisms/Forest";
import ForestLog from "../../organisms/ForestLog";
const StepOne = () => {
  const { showWeatherEffect, toggleWeatherEffect } = useUIStore();
  return (
    <section className="h-full flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-5 pt-5 pb-3">
          <h1 className="text-xl font-bold text-slate-800">나의 마음 숲</h1>
          <div className="flex flex-wrap gap-2 items-center justify-between mt-2">
            <p className="text-sm text-slate-600">
              한 번의 기록이 한 그루의 나무로 남아요.
            </p>
            <button
              aria-pressed={showWeatherEffect}
              onClick={toggleWeatherEffect}
              className="min-h-11 text-xs text-emerald-800 underline"
            >
              계절 효과 {showWeatherEffect ? "켜짐" : "꺼짐"}
            </button>
          </div>
        </div>
        <div className="relative h-48 md:h-64">
          <Forest />
        </div>
        <div className="px-4 py-4">
          <ForestLog />
        </div>
      </div>
      <div className="shrink-0 px-5 pt-3 pb-4 border-t border-slate-100 bg-white">
        <button
          onClick={() => {
            const draft = useWorryStore.getState();
            if (draft.saved) draft.reset();
            useStepStore.setState({
              step: draft.response && !draft.saved ? 5 : 4,
            });
          }}
          className="w-full py-3.5 bg-emerald-700 rounded-2xl text-white font-semibold"
        >
          마음 기록하기
        </button>
      </div>
    </section>
  );
};
export default StepOne;
