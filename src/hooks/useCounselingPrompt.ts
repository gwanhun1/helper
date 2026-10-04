import { useRef, useState } from "react";
import useWorryStore from "../store/worryStore";
import useUserStore from "../store/userStore";
import useStepStore from "../store/stepStore";
import { apiRequest } from "../utils/api";
interface Result { message: string; recordId: string; saved: boolean; open: boolean; count: number; }
const useCounselingPrompt = () => {
  const inFlight = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchResponse = async () => {
    if (!useUserStore.getState().user?.uid) throw new Error("로그인이 필요합니다.");
    if (inFlight.current) return;
    inFlight.current = true; setLoading(true); setError(null);
    const state = useWorryStore.getState();
    const requestId = state.requestId || crypto.randomUUID();
    useWorryStore.setState({ requestId });
    try {
      const result = await apiRequest<Result>("/api/chat", { requestId, who: state.who, how: state.how, worry: state.worry, level: state.level, open: state.isOpen });
      useWorryStore.setState({ response: result.message, recordId: result.recordId, saved: result.saved, isOpen: result.open });
      const user = useUserStore.getState().user;
      if (user) useUserStore.setState({ user: Object.assign(Object.create(Object.getPrototypeOf(user)), user, { count: result.count }) });
      useStepStore.setState({ step: 5 });
    } catch (cause) {
      const err = cause instanceof Error ? cause : new Error("상담을 완료하지 못했어요.");
      setError(err); throw err;
    } finally { inFlight.current = false; setLoading(false); }
  };
  return { fetchResponse, loading, error };
};
export default useCounselingPrompt;
