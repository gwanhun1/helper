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
      const isDev = import.meta.env.DEV;
      // Dev environment: Try communicating with Dify directly (Note: May fail due to CORS)
      // Prod environment: Use the Next.js/Vercel API route
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API 요청에 실패했습니다.');
      }

      const data = await response.json();
      const messageContent = data.message || data.answer || "";
      
      if (!messageContent) {
        throw new Error("응답 내용이 비어있습니다.");
      }

      setResponse(filter.clean(messageContent));
      
      try {
        await addWorry(messageContent);
      } catch (saveError) {
        console.error("Failed to save worry history:", saveError);
        // Continue flow so user can see the advice even if save fails
      }
      
      increase(); // Move to the next step
    } catch (err) {
      console.error(err);
      const errorObj = err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다.");
      setError(errorObj);
      throw errorObj; // Re-throw to let the component know the request failed
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
