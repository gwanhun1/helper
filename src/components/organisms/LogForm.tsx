import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Accordion from "../molecules/Accordion";
import { Item } from "../../hooks/useDateRankData";
import useSelectTreeStore from "../../store/selectTreeStore";
import { useRef, useEffect, useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import { useSwipeable } from "react-swipeable";

type LogFormProps = {
  data: Item;
  onDelete: () => Promise<void>;
};

const LogForm = ({ data, onDelete }: LogFormProps) => {
  const { content: selectContent, response: selectResponse } = useSelectTreeStore();
  const elementRef = useRef<HTMLDivElement>(null);
  const { deleteData, loading } = useDeleteData();
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleSelectTree = (data: Item) => {
    useSelectTreeStore.getState().select(data);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(data.id),
    onSwipedRight: () => handleSwipeRight(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 10,
    swipeDuration: 250,
  });

  const handleDelete = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await deleteData(data.id);
        await onDelete();
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const isSelected = selectContent == data.content && selectResponse === data.response;

  return (
    <div 
      ref={elementRef}
      {...handlers}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        relative w-full transition-transform duration-200 ease-out
        touch-pan-y select-none
        ${swipedItemId === data.id ? 'translate-x-[-80px]' : 'translate-x-0'}
      `}
    >
      <div 
        onClick={() => handleSelectTree(data)}
        className={`
          w-full rounded-lg bg-white shadow-sm
          transition-colors duration-200
          active:bg-gray-50
          ${isSelected ? "border-2 border-green" : "border border-gray-100"}
        `}
      >
        <Accordion
          title={
            <IconRow
              icon={<AiOutlineUser className="w-5 h-5" />}
              content={data.content}
              date={data.created_at}
            />
          }
          content={data.response}
        />
      </div>
      
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`
          absolute top-0 right-[-70px] h-full w-[70px]
          flex items-center justify-center
          bg-red-500 text-white rounded-r-lg
          transition-opacity duration-200
          active:bg-red-600
          disabled:opacity-50
          ${swipedItemId === data.id ? 'opacity-100' : 'opacity-0'}
        `}
        aria-label="삭제"
      >
        <AiOutlineDelete className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LogForm;
