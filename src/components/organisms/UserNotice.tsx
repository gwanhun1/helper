import {
  AiOutlineNotification,
  AiOutlineQuestionCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import IconRow from "../molecules/IconRow";

const UserNotice = () => {
  return (
    <div className="mt-5 bg-white rounded-[22px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      
      <div className="px-5 py-3 border-b border-gray-100"><IconRow
        icon={<AiOutlineNotification className="w-6 h-6 text-gray-500" />}
        mainText="공지"
        subText="버전 1.0.0 이 출시되었습니다! 🎉🎊"
      /></div>
      <div className="px-5 py-3 border-b border-gray-100">
      <IconRow
        icon={<AiOutlineQuestionCircle className="w-6 h-6 text-gray-500" />}
        mainText="자주묻는질문"
        subText="문의하기"
      />
      </div>
      <div className="px-5 py-3">
      <IconRow
        icon={<AiOutlineInfoCircle className="w-6 h-6 text-gray-500" />}
        mainText={
          <div className="flex justify-center items-center ">
            <div className="font-bold">웹/앱버전</div>
            <div className="font-bold text-gray-300 ml-2">v1.0.0</div>
          </div>
        }
      /></div>
    </div>
  );
};
export default UserNotice;
