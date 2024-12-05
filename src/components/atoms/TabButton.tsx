import { Link } from "react-router-dom";
import Text from "./Text";

// 재사용 가능한 Tab 버튼 컴포넌트
interface TabButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean; // 활성화 여부
}

const TabButton: React.FC<TabButtonProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`
        flex flex-col items-center justify-center
        min-w-[56px] min-h-[56px]
        ${active ? "text-green" : "text-gray-600 hover:text-green"}
        transition-colors duration-200
        active:opacity-70
        select-none
      `}
    >
      {icon}
      <Text size="xs" className="mt-1 text-[10px]">
        {label}
      </Text>
    </Link>
  );
};

export default TabButton;
