import { AiOutlineCreditCard, AiOutlineMail } from "react-icons/ai";
import IconRow from "../molecules/IconRow";

const UserAccount = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="my-4 text-lg font-bold text-gray-900">Account details</h2>
      <IconRow
        icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
        mainText="catherinemeyer@gmail.com"
        subText="Personal email"
      />
      <div className="my-4 border-t border-gray-200"></div>
      <IconRow
        icon={<AiOutlineCreditCard className="w-6 h-6 text-gray-500" />}
        mainText="*********"
        subText="**** 07"
      />
    </div>
  );
};
export default UserAccount;
