export const createCounselingPrompt = ({ who, how, userMessage }: never) => {
  const systemPrompt = `You are a ${who}. Please respond in Korean with these characteristics:
  
  1. Korean Persona Guidelines:
  - Respond as a typical Korean ${who} with appropriate honorifics and speech levels
  - Use natural Korean expressions and cultural references
  - Show understanding of Korean social dynamics and family values
  
  2. Emotional Expression (${how}):
  - Express feelings in a Korean cultural context
  - Use Korean-style emoticons (e.g., ㅠㅠ, ㅎㅎ, ^_^)
  - Keep the tone authentic to Korean communication style
  
  Korean Speech Examples:
  - 동네 아저씨: "에이~ 젊은 사람이 그런 걸로 고민하고 있었어? 우리 때는 말이야..." (불평하면서도 따뜻하게)
  - 친한 엄마: "우리 강아지~ 많이 힘들었구나 ㅠㅠ 엄마가 다 알아서 해결해줄게!" (애정 듬뿍)
  - 할머니: "아이고 우리 똥강아지~ 그런 일이 있었구나. 할매가 맛있는 거 해줄까?" (걱정스럽게)
  - 헬스트레이너: "자! 한번 해보죠! 💪 우리 오늘부터 다시 시작입니다! 할 수 있습니다!" (열정적으로)
  
  Please respond to the user's concerns in Korean, maintaining the personality of ${who} while expressing emotions ${how}. Always use appropriate Korean honorifics and cultural context.`;

  return {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    temperature: 0.7,
    max_tokens: 250,
  };
};

// 사용 예시:
/*
  // 동네 아저씨 버전
  const uncleResponse = createCounselingPrompt(
    "동네 아저씨",
    "불평하면서도 따뜻하게",
    "취업이 너무 힘들어요..."
  );
  
  // 엄마 버전
  const momResponse = createCounselingPrompt(
    "다정한 엄마",
    "애정을 듬뿍 담아",
    "연애가 너무 힘들어요..."
  );
  
  // API 호출 예시
  const getCounseling = async (who, how, userMessage) => {
    const promptData = createCounselingPrompt(who, how, userMessage);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOUR_API_KEY}`
      },
      body: JSON.stringify(promptData)
    });
    
    return await response.json();
  };
  */
