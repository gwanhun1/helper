import React, { FormEvent } from 'react';
import { FiSend } from "react-icons/fi";

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
}

const CommentInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "따뜻한 답변을 남겨주세요"
}:CommentInputProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E8EB] text-sm focus:outline-none focus:border-[#2AC1BC] placeholder:text-[#999999]"
        disabled={disabled}
      />
      <button 
        type="submit"
        onClick={handleSubmit}
        className="text-[#2AC1BC] hover:text-[#2AC1BC]/80 p-2"
        disabled={disabled}
      >
        <FiSend size={20} />
      </button>
    </form>
  );
};

export default CommentInput;
