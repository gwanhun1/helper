import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import useSelectTreeStore from "../../../store/selectTreeStore";
import useCounselingPrompt from "../../../hooks/useCounselingPrompt";
import { apiRequest } from "../../../utils/api";
const StepFive = () => {
  const state = useWorryStore();
  const navigate = useNavigate();
  const { fetchResponse, loading } = useCounselingPrompt();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visibility = async () => {
    setUpdating(true); setError(null);
    try { await apiRequest("/api/records", { id: state.recordId, open: !state.isOpen }, "PATCH"); state.setIsOpen(!state.isOpen); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "공개 설정을 바꾸지 못했어요."); }
    finally { setUpdating(false); }
  };
  const showRecord = () => {
    useSelectTreeStore.setState({ content: state.worry, response: state.response, level: state.level });
    useStepStore.setState({ step: 1 }); state.reset();
  };
  return <section className="h-full flex flex-col p-5">
    <h1 className="text-xl font-bold text-slate-800">당신을 위한 조언이 도착했어요</h1>
    <p className="mt-2 text-sm text-slate-600">{state.saved ? "마음의 숲에 기록을 저장했어요." : "조언은 도착했지만 기록 저장을 완료하지 못했어요."}</p>
    <div className="flex-1 min-h-0 overflow-y-auto py-5 space-y-4">
      <p className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 text-base text-slate-700 leading-loose whitespace-pre-wrap">{state.response}</p>
      {state.saved ? <div className="rounded-xl bg-white border border-slate-200 p-4"><p className="text-sm font-semibold text-slate-800">{state.isOpen ? "커뮤니티에 익명으로 공유 중" : "나만 보는 비공개 기록"}</p><p className="text-xs text-slate-600 mt-2">{state.isOpen ? "고민과 조언을 누구나 볼 수 있어요." : "다른 사람은 이 기록을 볼 수 없어요."}</p><button className="mt-3 text-sm underline text-emerald-800 min-h-11" disabled={updating} onClick={visibility}>{updating ? "설정 저장 중…" : state.isOpen ? "비공개로 바꾸기" : "커뮤니티에 공유하기"}</button></div> : <div role="alert" className="bg-amber-50 text-amber-900 rounded-xl p-4 text-sm"><p>화면을 떠나기 전에 저장을 다시 시도해주세요. 같은 요청은 상담 횟수를 다시 차감하지 않아요.</p><button className="mt-3 rounded-xl bg-white px-4 py-3 font-semibold" disabled={loading} onClick={() => { setError(null); void fetchResponse().catch(cause => setError(cause.message)); }}>{loading ? "저장 중…" : "기록 저장 다시 시도"}</button></div>}
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
    </div>
    <div className="space-y-2">{state.saved && <button onClick={showRecord} className="w-full py-3.5 rounded-xl bg-emerald-700 text-white font-semibold">내 기록 보기</button>}
      {state.saved && state.isOpen && <button onClick={() => navigate(`/advice?post=${state.recordId}`)} className="w-full py-3 text-emerald-800 text-sm">공유한 고민 보기</button>}
      <button onClick={() => { if (!state.saved && !window.confirm("저장을 완료하지 못했어요. 조언을 닫고 새 상담을 시작할까요?")) return; state.reset(); useStepStore.setState({ step: 4 }); }} className="w-full py-3 text-sm text-slate-600">새 마음 기록하기</button>
    </div>
  </section>;
};
export default StepFive;
