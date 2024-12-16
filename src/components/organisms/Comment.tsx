import LikeButton from "../molecules/LikeButton";

interface CommentProps {
  username: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
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
  disabled = false,
  formatDate
}: CommentProps) => {
  return (
    <div className="bg-[#F8F9FA] p-3.5 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs text-[#666666]">{username || '익명'}</span>
          </div>
          <span className="text-xs text-[#999999]">{formatDate(date)}</span>
        </div>
      </div>
      <p className="text-[14px] text-[#333333] ml-8">{content}</p>
      <div className="mt-2 ml-8">
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
