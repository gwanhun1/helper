import { Link } from "react-router-dom";
import Text from "./Text";

// 재사용 가능한 Tab 버튼 컴포넌트
interface TabButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center flex-1 justify-center ${
        active ? "text-green" : "text-gray-600 hover:text-green"
      } py-2 px-4 transition-all duration-200`}
    >
      <div className="text-xl">{icon}</div>
      <Text size="xs" className="mt-2 whitespace-nowrap">
        {label}
      </Text>
    </Link>
  );
};

export default TabButton;
