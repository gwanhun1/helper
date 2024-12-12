import { AiOutlineCreditCard, AiOutlineMail } from "react-icons/ai";
import IconRow from "../molecules/IconRow";
import Text from "../atoms/Text";

interface UserAccountProps {
  email?: string | null;
}

const UserAccount = ({ email }: UserAccountProps) => {
  return (
    <div className="bg-white rounded-[22px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] overflow-hidden">
      <Text variant="h3" weight="bold" className="px-5 pt-5 pb-3">
        계정 정보
      </Text>
      
      <div className="px-5 py-3 border-b border-gray-100">
        <IconRow
          icon={<AiOutlineMail className="w-5 h-5" />}
          mainText={email ?? "이메일 없음"}
          subText={email ? "로그인한 계정입니다." : "카카오로 로그인 되었습니다."}
        />
      </div>
      
      <div className="px-5 py-3">
        <IconRow
          icon={<AiOutlineCreditCard className="w-5 h-5" />}
          mainText="결제 정보"
          subText="등록된 결제 수단이 없습니다"
        />
      </div>
    </div>
  );
};

export default UserAccount;
