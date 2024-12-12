import { motion } from "framer-motion";
import { FiFeather, FiSun, FiCoffee, FiStar } from "react-icons/fi";

interface WellnessTipProps {
  tip: {
    emoji: string;
    category: string;
    text: string;
  };
}

const WellnessTipCard = ({ tip }: WellnessTipProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "마음챙김":
        return <FiFeather className="text-green-500" />;
      case "긍정":
        return <FiSun className="text-green-500" />;
      case "성장":
        return <FiStar className="text-green-500" />;
      case "휴식":
        return <FiCoffee className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-green-200 to-blue-100 p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tip.emoji}</span>
          <div className="flex flex-col items-start">
            <span className="text-green-900 font-bold text-lg">
              오늘의 마음 관리
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {getCategoryIcon(tip.category)}
              <span className="text-green-600 text-xs font-medium">
                {tip.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-gray-700 text-base leading-relaxed">
        {tip.text}
      </div>
    </motion.div>
  );
};

export default WellnessTipCard;
