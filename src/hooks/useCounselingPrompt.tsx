import { useState } from "react";
import useWorryStore from "../store/worryStore";

const useCounselingPrompt = () => {
  const { who, how, worry, setResponse } = useWorryStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponse = async () => {
    setLoading(true);
    setError(null);

    const systemPrompt = `You are a ${who}. Please respond in Korean with these characteristics:
    
1. Korean Persona Guidelines:
- Respond as a typical Korean ${who} with appropriate honorifics and speech levels
- Use natural Korean expressions and cultural references
- Show understanding of Korean social dynamics and family values

2. Emotional Expression (${how}):
- Express feelings in a Korean cultural context
- Sometime use Korean-style emoticons (e.g., ㅠㅠ, ㅎㅎ, ^_^)
- Keep the tone authentic to Korean communication style

Korean Speech Examples:
- 동네 아저씨: "에이~ 젊은 사람이 그런 걸로 고민하고 있었어? 우리 때는 말이야..." (불평하면서도 따뜻하게)
- 엄마: "우리 강아지~ 많이 힘들었구나 ㅠㅠ 엄마가 다 알아서 해결해줄게!" (애정 듬뿍)
- 할머니: "아이고 우리 똥강아지~ 그런 일이 있었구나. 할매가 맛있는 거 해줄까?" (걱정스럽게)
- 헬스트레이너: "자! 한번 해보죠! 💪 우리 오늘부터 다시 시작입니다! 할 수 있습니다!" (열정적으로)

Please respond to the user's concerns in Korean, maintaining the personality of ${who} while expressing emotions ${how}. Always use appropriate Korean honorifics and cultural context.`;

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: worry },
      ],
      temperature: 0.7,
      max_tokens: 250,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AI_KEY}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok && data.choices) {
        const aiResponse = data.choices[0].message.content;
        setResponse(aiResponse); // Zustand store에 결과 저장
      } else {
        throw new Error(data.error?.message || "API 요청 실패");
      }
    } catch (err: any) {
      setError(err.message);
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
