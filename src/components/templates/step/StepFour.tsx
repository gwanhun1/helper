import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import useUserStore from "../../../store/userStore";
import useCounselingPrompt from "../../../hooks/useCounselingPrompt";
import { worryCategories } from "../../../constants/records";
import { whoList, howList } from "../../../constants/worryPrompts";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
const moods = [
  "많이 힘들어요",
  "조금 지쳤어요",
  "보통이에요",
  "편안해요",
  "기분 좋아요",
];
const StepFour = () => {
  const state = useWorryStore();
  const { fetchResponse, loading } = useCounselingPrompt();
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    void useUserStore.getState().refreshAccount();
  }, []);
  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(
      () => setLoadingStep((step) => (step + 1) % 4),
      2500,
    );
    return () => clearInterval(timer);
  }, [loading]);
  const submit = async () => {
    setError(null);
    try {
      await fetchResponse();
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "상담하지 못했어요.";
      setError(message);
      toast.error(message);
    }
  };
  if (loading) return <Loading textStep={loadingStep} />;
  return (
    <section className="h-full flex flex-col px-5 pt-5 pb-4">
      <div className="flex justify-between items-start gap-3 mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            지금 마음을 들려주세요
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            편하게 적어도 괜찮아요. 기록은 기본 비공개예요.
          </p>
        </div>
        <button
          className="text-sm text-slate-600 p-2 shrink-0"
          onClick={() => useStepStore.setState({ step: 1 })}
        >
          내 숲
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto space-y-5 pb-3">
        <div>
          <label
            htmlFor="worry-content"
            className="text-sm font-semibold text-slate-700"
          >
            어떤 일이 있었나요?
          </label>
          <textarea
            id="worry-content"
            value={state.worry}
            onChange={(event) => state.setWorry(event.target.value)}
            maxLength={5000}
            placeholder="오늘 마음에 남은 일을 적어주세요."
            className="mt-2 w-full min-h-[160px] p-4 bg-white border border-slate-200 rounded-2xl text-base leading-relaxed resize-y"
          />
          <p className="text-xs text-slate-500 text-right">
            {state.worry.length} / 5,000자
          </p>
        </div>
        <div>
          <label
            htmlFor="worry-category"
            className="text-sm font-semibold text-slate-700"
          >
            고민 분야
          </label>
          <select
            id="worry-category"
            value={state.category}
            onChange={(event) => state.setCategory(event.target.value)}
            className="mt-2 w-full border border-slate-200 rounded-xl bg-white p-3 text-base"
          >
            {worryCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-slate-700 mb-2">
            지금 기분은 어떤가요?
          </legend>
          <div className="grid grid-cols-5 gap-1">
            {moods.map((label, index) => (
              <label
                key={label}
                className={`rounded-xl border px-1 py-3 text-center cursor-pointer ${state.level === index + 1 ? "border-emerald-700 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-600"}`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="mood"
                  value={index + 1}
                  checked={state.level === index + 1}
                  onChange={() => state.setLevel(index + 1)}
                />
                <span aria-hidden="true" className="text-xl block">
                  {["😔", "😕", "😐", "🙂", "😊"][index]}
                </span>
                <span className="text-xs leading-tight block mt-2">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <details className="rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-700">
            상담 스타일 · {state.who} / {state.how}
          </summary>
          <div className="grid grid-cols-2 gap-3 pt-4">
            <label className="text-sm">
              상담 대상
              <select
                value={state.who}
                onChange={(event) => state.setWho(event.target.value)}
                className="block w-full border rounded-lg p-2 mt-1"
              >
                {whoList.map((item) => (
                  <option key={item.who} value={item.who}>
                    {item.who}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              조언 말투
              <select
                value={state.how}
                onChange={(event) => state.setHow(event.target.value)}
                className="block w-full border rounded-lg p-2 mt-1"
              >
                {howList.map((item) => (
                  <option key={item.how} value={item.how}>
                    {item.how}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </details>
        <label className="flex items-start gap-3 text-sm p-4 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="checkbox"
            checked={state.isOpen}
            onChange={(event) => {
              state.setIsOpen(event.target.checked);
              useWorryStore.setState({ requestId: null });
            }}
            className="mt-1 w-4 h-4"
          />
          <span>
            <span className="font-semibold text-slate-800">
              커뮤니티에 익명으로 공유하기
            </span>
            <span className="block text-slate-600 text-xs mt-1 leading-relaxed">
              선택하면 고민과 AI 조언을 누구나 볼 수 있어요. 이름·연락처 등 개인
              정보는 적지 마세요.
            </span>
          </span>
        </label>
        <p className="text-xs text-slate-600 leading-relaxed">
          AI 조언을 위해 입력한 고민을 외부 AI 서비스에 전달합니다. AI 조언은
          전문 상담이나 진단을 대신하지 않아요.
        </p>
        {error && (
          <p
            role="alert"
            className="p-3 rounded-xl bg-rose-50 text-sm text-rose-700"
          >
            {error}
          </p>
        )}
        {user?.count === 0 && (
          <div className="p-3 rounded-xl bg-amber-50 text-sm text-amber-800">
            오늘의 상담을 모두 사용했어요. 한국 시간 오전 0시에 다시 이용할 수
            있어요.
            <button
              className="block underline mt-2"
              onClick={() => navigate("/vent")}
            >
              감정 풀기 이용하기
            </button>
          </div>
        )}
      </div>
      <button
        disabled={!state.worry.trim() || user?.count === 0}
        onClick={submit}
        className="w-full rounded-2xl bg-emerald-700 text-white py-3.5 font-semibold disabled:opacity-50"
      >
        조언 받고 기록하기
        {user?.count !== undefined ? ` · ${user.count}회 남음` : ""}
      </button>
    </section>
  );
};
export default StepFour;
