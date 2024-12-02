import { AiOutlineUser } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Accordion from "../molecules/Accordion";
import { Item } from "../../hooks/useDateRankData";
import useSelectTreeStore from "../../store/selectTreeStore";
import { useRef, useEffect } from "react";

type LogFormProps = { data: Item };

const LogForm = ({ data }: LogFormProps) => {
  const { content: selectContent, response: selectResponse } =
    useSelectTreeStore();
  const elementRef = useRef<HTMLDivElement>(null);

  const handleSelectTree = (data: Item) => {
    useSelectTreeStore.getState().select(data);
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
      <IconRow
        icon={<AiOutlineUser className="w-6 h-6 text-gray-500" />}
        mainText={<Accordion title={data.content} content={data.response} />}
        subText={data.date}
      />
    </div>
  );
};

export default LogForm;
