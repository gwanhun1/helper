import { FiSend } from "react-icons/fi";

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const CommentInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "따뜻한 답변을 남겨주세요"
}: CommentInputProps) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E8EB] text-sm focus:outline-none focus:border-[#2AC1BC] placeholder:text-[#999999]"
      />
      <button 
        onClick={onSubmit}
        // disabled={disabled}
        className="text-[#2AC1BC] hover:text-[#2AC1BC]/80 p-2"
      >
        <FiSend size={20} />
      </button>
    </div>
  );
};

export default CommentInput;
