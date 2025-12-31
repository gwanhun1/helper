import { useState } from "react";
import useWorryStore from "../store/worryStore";
import useUserStore from "../store/userStore";
import useWorryManager from "./useWorryManager";
import useStepStore from "../store/stepStore";
import Filter from "badwords-ko";

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
      const API_URL = isDev
        ? `${import.meta.env.VITE_DIFY_BASE_URL}/chat-messages`
        : "/api/chat";

      const requestBody = isDev
        ? {
            inputs: { who, how, worry },
            query: "상담을 진행해줘.",
            response_mode: "blocking",
            user: "helper-user",
          }
        : { who, how, worry };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (isDev) {
        headers["Authorization"] = `Bearer ${
          import.meta.env.VITE_DIFY_API_KEY
        }`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detailedMessage =
          errorData.details?.message ||
          errorData.error ||
          errorData.message ||
          "API 요청에 실패했습니다.";
        throw new Error(detailedMessage);
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
      }

      increase();
    } catch (err) {
      console.error(err);

      let errorMessage = "알 수 없는 오류가 발생했습니다.";

      if (err instanceof Error) {
        if (
          err.message.includes("429") ||
          err.message.includes("RESOURCE_EXHAUSTED")
        ) {
          errorMessage =
            "현재 상담 요청이 많아 연결이 지연되고 있습니다. 약 1분 후에 다시 시도해주세요.";
        } else if (
          err.message.includes("504") ||
          err.message.includes("timeout")
        ) {
          errorMessage =
            "응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
        } else if (err.message.includes("Safety")) {
          errorMessage =
            "입력하신 내용에 부적절한 표현이 포함되어 있어 상담이 어렵습니다.";
        } else {
          errorMessage = err.message;
        }
      }

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
