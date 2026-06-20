import { useState } from "react";
import useWorryStore from "../store/worryStore";
import useUserStore from "../store/userStore";
import useWorryManager from "./useWorryManager";
import useStepStore from "../store/stepStore";
import Filter from "badwords-ko";
import { generateCounselingResponse } from "../utils/counsel";

/**
 * 상담 응답 훅.
 *
 * 과거에는 Dify(외부 유료 LLM)에 네트워크 요청을 보내 응답을 받았으나,
 * 토큰 비용 문제로 외부 의존성을 제거하고 로컬 규칙 기반 생성기로 전환했다.
 * 외부 호출이 없으므로 비용·지연·타임아웃 리스크가 사라졌고,
 * "상담 중" UX 유지를 위해 짧은 지연만 둔다.
 */
const RESPONSE_DELAY_MS = 900;

const useCounselingPrompt = () => {
  const { who, how, worry, setResponse } = useWorryStore();
  const { addWorry } = useWorryManager();
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { increase } = useStepStore();
  const filter = new Filter();

  const fetchResponse = async () => {
    if (!user?.uid) {
      const err = new Error("로그인이 필요합니다.");
      setError(err);
      throw err;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // "상담 중" 연출을 위한 짧은 지연 (외부 호출 없음)
      await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY_MS));

      const messageContent = generateCounselingResponse({ who, how, worry });

      if (!messageContent) {
        throw new Error("응답 내용이 비어있습니다.");
      }

      setResponse(filter.clean(messageContent));

      try {
        await addWorry(messageContent);
      } catch (saveError) {
        console.error("Failed to save worry history:", saveError);
      }

      increase();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      const userFriendlyError = new Error(errorMessage);
      setError(userFriendlyError);
      throw userFriendlyError;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchResponse,
    loading,
    error,
  };
};

export default useCounselingPrompt;
