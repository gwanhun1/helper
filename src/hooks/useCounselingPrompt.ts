import { useState } from "react";
import useWorryStore from "../store/worryStore";
import useUserStore from "../store/userStore";
import useWorryManager from "./useWorryManager";
import useStepStore from "../store/stepStore";
import Filter from "badwords-ko";

// OpenAI API 요청에 필요한 타입 정의가 필요 없으므로 제거됨

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
      setError(new Error("로그인이 필요합니다."));
      return;
    }

    if (loading) {
      setError(new Error("현재 요청이 진행 중입니다. 잠시 후 다시 시도해주세요."));
      return;
    }

    try {
      setLoading(true);

      const isDev = import.meta.env.DEV;
      const API_URL = isDev 
        ? `${import.meta.env.VITE_DIFY_BASE_URL}/chat-messages` 
        : '/api/chat';
      
      const requestBody = isDev ? {
        inputs: { who, how, worry },
        query: "상담을 진행해줘.",
        response_mode: "blocking",
        user: "helper-user",
      } : { who, how, worry };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (isDev) {
        headers['Authorization'] = `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('API 요청에 실패했습니다.');
      }

      const data = await response.json();
      const messageContent = data.message || data.answer || "";
      setResponse(filter.clean(messageContent));
      await addWorry(messageContent);
      increase();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err
          : new Error("알 수 없는 오류가 발생했습니다.")
      );
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
