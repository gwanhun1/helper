import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  iconColor?: string;
  iconBgColor?: string;
}

const StatCard = ({
  icon,
  title,
  value,
  iconColor = "text-green-600",
  iconBgColor = "bg-green-50",
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[22px] p-4 shadow-[0_2px_16px_rgb(0,0,0,0.04)]"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <div className="text-[11px] text-gray-500 font-medium">
            {title}
          </div>
          <div className="text-[13px] font-extrabold text-gray-900">
            {value}
          </div>
        </div>
        <div className={`${iconBgColor} p-2 rounded-full`}>
          <div className={`${iconColor} text-base`}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
