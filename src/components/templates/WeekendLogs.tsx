import { AiOutlineUser } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import TitleContainer from "../molecules/TitleContainer";
import Accordion from "../atoms/Accordion";

const WeekendLogs = () => {
  return (
    <>
      <TitleContainer title="주간" />
      <div className="my-2 cursor-pointer" onClick={() => setSelect(1)}>
        <IconRow
          icon={<AiOutlineUser className="w-6 h-6 text-gray-500" />}
          mainText={<Accordion title="제목" content="내용" />}
          subText="내용"
        />
      </div>
      <div className="my-2 cursor-pointer" onClick={() => setSelect(1)}>
        <IconRow
          icon={<AiOutlineUser className="w-6 h-6 text-gray-500" />}
          mainText={<Accordion title="제목" content="내용" />}
          subText="내용"
        />
      </div>
      <div className="my-2 cursor-pointer" onClick={() => setSelect(1)}>
        <IconRow
          icon={<AiOutlineUser className="w-6 h-6 text-gray-500" />}
          mainText={<Accordion title="제목" content="내용" />}
          subText="내용"
        />
      </div>
    </>
  );
};

export default WeekendLogs;
