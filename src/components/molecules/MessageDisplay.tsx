import React from 'react';

interface MessageDisplayProps {
  level: number | null;
}

const MessageDisplay = ({ level }: MessageDisplayProps) => {
  const getMessage = () => {
    if (level === null) return "";
    if (level < 3) return `마음이 차분하고 안정적입니다. <br/>계속 잘 유지하세요!`;
    if (level < 6) return `잘하고 계십니다. <br/>하지만 휴식을 취하고 여유를 가지세요.`;
    return `조금 벅차게 느껴지는 것 같습니다. <br/>자신을 위한 시간을 가져보세요.`;
  };

  return (
    <p 
      className="mt-2 text-white text-center whitespace-pre-line" 
      dangerouslySetInnerHTML={{ __html: getMessage() }} 
    />
  );
};

export default MessageDisplay;
