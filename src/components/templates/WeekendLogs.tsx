import { AiOutlineMail } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import TitleContainer from "../molecules/TitleContainer";

type WeekendLogsProps = {
  setSelect: React.Dispatch<React.SetStateAction<number>>;
};

const WeekendLogs = ({ setSelect }: WeekendLogsProps) => {
  return (
    <>
      <TitleContainer title="주간" />
      <div className="my-2 cursor-pointer" onClick={() => setSelect(1)}>
        <IconRow
          icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
          mainText="제목"
          subText="내용"
        />
      </div>
      <div className="my-2 cursor-pointer" onClick={() => setSelect(1)}>
        <IconRow
          icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
          mainText="제목"
          subText="내용"
        />
      </div>
      <div className="my-2 cursor-pointer" onClick={() => setSelect(1)}>
        <IconRow
          icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
          mainText="제목"
          subText="내용"
        />
      </div>
    </>
  );
};

export default WeekendLogs;
