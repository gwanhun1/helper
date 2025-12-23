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

const LogForm = ({ data, onDelete }:LogFormProps) => {
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
        transition-all 
        duration-300
        flex-1 flex flex-col min-h-0
        ${
          swipedItemId === data.id
            ? "translate-x-[-80px] bg-rose-50"
            : ""
        }
      `}
      onClick={() => handleSelectTree(data)}
    >
      <div className="flex-1 flex flex-col pt-2 pb-4 px-5 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="shrink-0 flex items-center gap-3">
            <div
              className={`
              w-9 h-9 
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
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Thought Fragment</span>
          </div>
          <div className="flex-1 min-h-0">
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
