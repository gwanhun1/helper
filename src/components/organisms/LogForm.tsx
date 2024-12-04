import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Accordion from "../molecules/Accordion";
import { Item } from "../../hooks/useDateRankData";
import useSelectTreeStore from "../../store/selectTreeStore";
import { useRef, useEffect } from "react";
import useDeleteData from "../../hooks/useDeleteData";

type LogFormProps = { data: Item };

const LogForm = ({ data }: LogFormProps) => {
  const { content: selectContent, response: selectResponse } =
    useSelectTreeStore();
  const elementRef = useRef<HTMLDivElement>(null);
  const { deleteData, loading } = useDeleteData();

  const handleSelectTree = (data: Item) => {
    useSelectTreeStore.getState().select(data);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteData(data.id);
    }
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

  return (
    <div
      ref={elementRef}
      className={`
        px-2
        my-1 cursor-pointer
        transition-all duration-500 ease-in-out
        ${
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
          subText={data.date}
        />
        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 hover:text-red-500 transition-colors"
        >
          <AiOutlineDelete className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LogForm;
