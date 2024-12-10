import { AiOutlineMail } from "react-icons/ai";
import IconRow from "../molecules/IconRow";

const UserNotice = () => {
  return (
    <div className="p-4 mt-5 bg-white rounded-lg shadow-md">
      <h2 className="my-4 text-lg font-bold text-gray-900">Notice</h2>
      <IconRow
        icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
        mainText="공지1"
        subText="공지1"
      />
      <IconRow
        icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
        mainText="자주묻는질문"
        subText="문의하기"
      />
      <IconRow
        icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
        mainText={
          <div className="flex justify-center items-center mt-5">
            <div className="font-bold">웹버전/앱버전</div>
            <div className="font-bold text-gray-300 ml-2">v1.0.0</div>
          </div>
        }
      />
    </div>
  );
};
export default UserNotice;
