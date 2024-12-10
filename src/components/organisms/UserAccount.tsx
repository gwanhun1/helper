import { AiOutlineCreditCard, AiOutlineMail } from "react-icons/ai";
import IconRow from "../molecules/IconRow";

interface UserAccountProps {
  email?: string | null;
}

const UserAccount = ({ email }: UserAccountProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="my-4 text-lg font-bold text-gray-900">Account details</h2>
      <IconRow
        icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
        mainText={email ?? "이메일 없음"}
        subText={email ? "로그인한 계정입니다." : "카카오로 로그인 되었습니다."}
      />
      <div className="my-4 border-t border-gray-200"></div>
      <IconRow
        icon={<AiOutlineCreditCard className="w-6 h-6 text-gray-500" />}
        mainText="*********"
        subText="**** **"
      />
    </div>
  );
};
export default UserAccount;
