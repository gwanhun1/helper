import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Accordion from "../molecules/Accordion";
import useSelectTreeStore from "../../store/selectTreeStore";
import { useRef, useEffect, useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import { useSwipeable } from "react-swipeable";
import { Item } from "../../hooks/useWorryData";

type LogFormProps = {
  data: Item;
  onDelete: () => Promise<void>;
};

const LogForm = ({ data, onDelete }: LogFormProps) => {

  const { content: selectContent, response: selectResponse } =
    useSelectTreeStore();
  const elementRef = useRef<HTMLDivElement>(null);
  const { deleteData, loading } = useDeleteData();
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);

  const handleSelectTree = (data: Item) => {
    useSelectTreeStore.getState().select(data);
  };

  

  const handleDelete = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await deleteData(data.id);
        await onDelete(); // 삭제 후 데이터 새로고침
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
        px-4
        my-1 cursor-pointer
        transition-all duration-500 ease-in-out
        ${
          swipedItemId === data.id  ? "bg-red-400":
          isSelected
            ? "bg-green-200 -translate-y-1 shadow-md order-first"
            : "bg-white"
        }
      `}
      onClick={() => handleSelectTree(data)}
      style={{
        position: "relative",
        zIndex: isSelected ? 10 : 1,
      }}
    >
      <div className="flex justify-between items-center">
        <IconRow
          icon={<AiOutlineUser className="w-6 h-6 text-gray-500" />}
          mainText={<Accordion title={data.content} content={data.response} />}
        />
        {swipedItemId === data.id && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 hover:text-red-500 transition-colors"
          >
            <AiOutlineDelete className="w-5 h-5" />
          </button>
        )}
      </div>
       <div
       className={"flex justify-end"}
     >
       <p className="my-1 text-xs text-gray-500">{data.date}</p>
     </div>
    </div>
  );
};

export default LogForm;
