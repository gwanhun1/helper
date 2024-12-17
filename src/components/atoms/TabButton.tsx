import { Link } from "react-router-dom";
import Text from "./Text";
import { ReactNode } from "react";

interface TabButtonProps {
  to: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}

const TabButton  = ({ to, icon, label, active }:TabButtonProps) => {
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
