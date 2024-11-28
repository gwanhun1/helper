import { AiOutlineUser } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Accordion from "../molecules/Accordion";
import { LogItem } from "../../hooks/useLogData";

type LogFormProps = { data: LogItem };

const LogForm = ({ data }: LogFormProps) => {
  return (
    <div className="my-1 cursor-pointer">
      <IconRow
        icon={<AiOutlineUser className="w-6 h-6 text-gray-500" />}
        mainText={<Accordion title={data.content} content={data.response} />}
        subText={data.date}
      />
    </div>
  );
};

export default LogForm;
