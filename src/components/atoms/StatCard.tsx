import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  iconColor?: string;
}

const StatCard = ({ icon, title, value, iconColor = 'text-green-500' }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
    >
      <div className={`flex items-center gap-2 ${iconColor} mb-3`}>
        {icon}
        <span className="font-semibold text-gray-700">{title}</span>
      </div>
      <div className="text-md font-bold text-gray-800">{value}</div>
    </motion.div>
  );
};

export default StatCard;
