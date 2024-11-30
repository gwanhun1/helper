import { AiOutlineUser } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Accordion from "../molecules/Accordion";
import { Item } from "../../hooks/useDateRankData";
import useSelectTreeStore from "../../store/selectTreeStore";

type LogFormProps = { data: Item };

const LogForm = ({ data }: LogFormProps) => {
  const { content: selectContent, response: selectResponse } =
    useSelectTreeStore();

  const handleSelectTree = (data: Item) => {
    useSelectTreeStore.getState().select(data);
  };

  return (
    <div
      className={`
        px-2
        my-1 cursor-pointer
        transition-colors duration-300
        ${
          selectContent == data.content && selectResponse === data.response
            ? "bg-green-200"
            : "bg-white"
        }
      `}
      onClick={() => handleSelectTree(data)}
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
