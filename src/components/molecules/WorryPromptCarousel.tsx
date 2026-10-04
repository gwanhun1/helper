import { useNavigate } from "react-router-dom";
import useStepStore from "../../store/stepStore";
import useWorryStore from "../../store/worryStore";
const WorryPromptCarousel = () => {
  const navigate = useNavigate();
  const start = () => {
    const draft = useWorryStore.getState();
    if (draft.response && !draft.saved) useStepStore.setState({ step: 5 });
    else {
      if (draft.saved) draft.reset();
      useStepStore.setState({ step: 4 });
    }
    navigate("/worry");
  };
  return (
    <section className="mx-4 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
      <p className="text-sm font-semibold text-emerald-800">나만의 마음 숲</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-800">
        오늘 마음은 어떤가요?
      </h1>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        마음을 적고 AI 조언을 받아보세요.
        <br />
        기록은 나에게만 보여요.
      </p>
      <button
        onClick={start}
        className="mt-5 w-full rounded-xl bg-emerald-700 text-white py-3 font-semibold"
      >
        마음 기록하기
      </button>
    </section>
  );
};
export default WorryPromptCarousel;
