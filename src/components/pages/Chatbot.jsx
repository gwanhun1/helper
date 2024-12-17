import React, { useState } from 'react';
import OpenAI from 'openai';

const Chatbot = () => {
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: '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',  // 여기에 OpenAI API 키를 넣으세요.
  });

  // 상태 관리
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 메시지 추가 함수
  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  // 사용자 메시지 전송
  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage('user', message);
    setUserInput('');
    setLoading(true);

    try {
      // OpenAI API 호출
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',  // 사용하려는 모델
        messages: [{ role: 'user', content: message }],
        max_tokens: 1024,
        temperature: 1,
      });

      const aiResponse = response.choices?.[0]?.message?.content || 'No response';
      addMessage('bot', aiResponse);
    } catch (error) {
      console.error('오류 발생!', error);
      addMessage('bot', '오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div id='Chatbot'>
      <h1>인공지능 챗봇</h1>
      <div className='chatDiv'>
        {loading && <span className="messageWait">답변을 기다리고 있습니다...</span>}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {`${msg.sender === 'user' ? '나' : '챗봇'} : ${msg.message}`}
          </div>
        ))}
      </div>
      <div className='inputDiv'>
        <input
          type='text' 
          placeholder='메시지를 입력하세요'
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chatbot;
