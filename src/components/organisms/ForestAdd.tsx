import { AiOutlineMail } from "react-icons/ai";
import IconRow from "../molecules/IconRow";

const ForestAdd = () => {
  return (
    <div className="h-1/5 ">
      <div className="my-2 cursor-pointer">
        <IconRow
          icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
          mainText="제목"
          subText="내용"
        />
      </div>
    </div>
  );
};

export default ForestAdd;
