import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import Accordion from "../molecules/Accordion";
import useSelectTreeStore from "../../store/selectTreeStore";
import { useRef, useEffect, useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import { useSwipeable } from "react-swipeable";
import { Item } from "../../hooks/useContentsData";

interface LogFormProps {
  data: Item;
  onDelete?: () => void;
}

const LogForm: React.FC<LogFormProps> = ({ data, onDelete }) => {
  const { content: selectContent, response: selectResponse } =
    useSelectTreeStore();
  const elementRef = useRef<HTMLDivElement>(null);
  const { deleteData, loading } = useDeleteData();
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTree = (data: Item) => {
    useSelectTreeStore.getState().select(data);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await deleteData(data.id);
        if (onDelete) {
          await onDelete();
        }
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleSwipeLeft = (id: string) => {
    setSwipedItemId(id);
  };

  const handleSwipeRight = () => {
    setSwipedItemId(null);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const isSelected =
    selectContent == data.content && selectResponse === data.response;

  useEffect(() => {
    if (isSelected && elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isSelected]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(data.id),
    onSwipedRight: handleSwipeRight,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.clientX;
      const diffX = startX - currentX;

      if (diffX > 50) {
        handleSwipeLeft(data.id);
        document.removeEventListener("mousemove", handleMouseMove);
      } else if (diffX < -50) {
        handleSwipeRight();
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      {...swipeHandlers}
      onMouseDown={handleMouseDown}
      ref={elementRef}
      className={`
        relative 
        border-b border-slate-200
        transition-all 
        duration-300
        ${
          swipedItemId === data.id
            ? "translate-x-[-80px] bg-rose-50"
            : "hover:bg-slate-50"
        }
      `}
      onClick={() => handleSelectTree(data)}
    >
      <div className="py-4 px-5">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <div
              className={`
              w-10 h-10 
              rounded-full 
              flex items-center justify-center
              transition-colors
              ${isSelected ? "bg-emerald-100" : "bg-slate-100"}
            `}
            >
              <AiOutlineUser
                className={`w-5 h-5 ${
                  isSelected ? "text-emerald-600" : "text-slate-500"
                }`}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <Accordion
              title={data.content}
              content={data.response}
              isOpen={true}
              onToggle={onToggle}
            />
          </div>
        </div>
      </div>

      {swipedItemId === data.id && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="absolute right-[-80px] top-0 bottom-0 w-[80px] bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center"
        >
          <AiOutlineDelete className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default LogForm;
