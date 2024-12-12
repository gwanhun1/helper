import {
  AiOutlineNotification,
  AiOutlineQuestionCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import IconRow from "../molecules/IconRow";

const UserNotice = () => {
  return (
    <div className="p-4 mt-5 bg-white rounded-lg shadow-md">
      <IconRow
        icon={<AiOutlineNotification className="w-6 h-6 text-gray-500" />}
        mainText="공지"
        subText="버전 1.0.0 이 출시되었습니다! 🎉🎊"
      />
      <IconRow
        icon={<AiOutlineQuestionCircle className="w-6 h-6 text-gray-500" />}
        mainText="자주묻는질문"
        subText="문의하기"
      />
      <IconRow
        icon={<AiOutlineInfoCircle className="w-6 h-6 text-gray-500" />}
        mainText={
          <div className="flex justify-center items-center ">
            <div className="font-bold">웹/앱버전</div>
            <div className="font-bold text-gray-300 ml-2">v1.0.0</div>
          </div>
        }
      />
    </div>
  );
};
export default UserNotice;
