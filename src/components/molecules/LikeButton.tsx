import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onToggle: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

const LikeButton = ({ isLiked, count, onToggle, disabled = false, size = "md" }: LikeButtonProps) => {
  const iconSize = size === "sm" ? 16 : 18;
  
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className="flex items-center gap-1.5 text-[#666666]"
    >
      {isLiked ? (
        <AiFillHeart className="text-[#FF3D3D]" size={iconSize} />
      ) : (
        <AiOutlineHeart size={iconSize} />
      )}
      <span className={`${size === "sm" ? "text-xs" : "text-sm"}`}>{count || 0}</span>
    </button>
  );
};

export default LikeButton;
