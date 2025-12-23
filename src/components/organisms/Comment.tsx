import LikeButton from "../molecules/LikeButton";
import { FiTrash2 } from "react-icons/fi";

interface CommentProps {
  username: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onDelete?: () => void;
  isMyComment?: boolean;
  disabled?: boolean;
  formatDate: (date: string | undefined) => string;
}

const Comment = ({
  username,
  content,
  date,
  likes,
  isLiked,
  onToggleLike,
  onDelete,
  isMyComment = false,
  disabled = false,
  formatDate
}: CommentProps) => {
  // 이름의 첫 글자를 아바타로 사용
  const avatarText = username ? username.charAt(0).toUpperCase() : '?';
  
  return (
    <div className="bg-[#F8F9FA] p-3.5 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-green-700">{avatarText}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#333333]">{username || '익명'}</span>
            {isMyComment && (
              <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded">나</span>
            )}
            <span className="text-xs text-[#999999]">{formatDate(date)}</span>
          </div>
        </div>
        {isMyComment && onDelete && (
          <button 
            onClick={onDelete}
            disabled={disabled}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="댓글 삭제"
          >
            <FiTrash2 size={14} />
          </button>
        )}
      </div>
      <p className="text-[14px] text-[#333333] ml-9 leading-relaxed">{content}</p>
      <div className="mt-2 ml-9">
        <LikeButton
          isLiked={isLiked}
          count={likes}
          onToggle={onToggleLike}
          disabled={disabled}
          size="sm"
        />
      </div>
    </div>
  );
};

export default Comment;
