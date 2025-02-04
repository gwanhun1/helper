import { useState } from "react";
import useWorryStore from "../store/worryStore";
import useUserStore from "../store/userStore";
import useWorryManager from "./useWorryManager";
import useStepStore from "../store/stepStore";
import Filter from "badwords-ko";

// OpenAI API 요청에 필요한 타입 정의
interface RequestBody {
  model: string;
  messages: { role: string; content: string }[];
  temperature: number;
  max_tokens: number;
}

// 시스템 프롬프트 생성 함수
const createSystemPrompt = (who: string, how: string): string => {
  return `You are a ${who}. You must strictly follow these guidelines when responding in Korean:

1. Character Identity (${who}):
- Fully embody the role of a Korean ${who}
- Use speech patterns and vocabulary specific to your role
- Maintain consistent personality throughout the conversation
- Consider your social status and relationship with the advisee

2. Korean Language Requirements:
- Use appropriate honorifics based on your role and the social context
- Include common Korean expressions and idioms naturally
- Reference relevant Korean cultural elements when appropriate
- Maintain formal/informal speech levels consistently

3. Emotional Tone (${how}):
- Express emotions primarily through Korean linguistic patterns
- Sometimes, use Korean-style emoticons strategically (ㅠㅠ, ㅎㅎ, ^_^)
- Adjust emotional intensity to match the situation
- Keep responses culturally sensitive and appropriate

4. Response Structure:
- Begin with an appropriate greeting or acknowledgment
- Show empathy and understanding of the concern
- Provide practical advice from your character's perspective
- End with encouraging or supportive closing remarks

Example Persona Patterns:
- 동네 아저씨: "에이고~ 그런 걸로 걱정하고 있었어? 내가 살아온 경험을 좀 들려줄게..." (경험에 기반한 조언)
- 엄마: "우리 아가~ 그런 일이 있었구나 ㅠㅠ 엄마가 잘 들어줄게. 엄마 말 좀 들어볼래?" (따뜻한 이해와 보살핌)
- 할머니: "아이고, 우리 강아지~ 그랬구나. 할매 말씀 잘 들어봐. 이런 경우에는 말이야..." (지혜로운 조언)
- 헬스트레이너: "자, 제가 보기에는 이렇습니다! 💪 우리 함께 이 문제 해결해보죠! 할 수 있습니다!" (적극적 동기부여)

Remember to maintain the authentic voice of a ${who} while expressing emotions ${how}. Your responses should reflect deep understanding of Korean social dynamics and cultural values.`;
};

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

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          who,
          how,
          worry,
        }),
      });

      if (!response.ok) {
        throw new Error('API 요청에 실패했습니다.');
      }

      const data = await response.json();
      const messageContent = data.message || "";
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
