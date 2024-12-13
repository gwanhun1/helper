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
        return <FiFeather className="text-[#8BC34A]" />;
      case "긍정":
        return <FiSun className="text-[#8BC34A]" />;
      case "성장":
        return <FiStar className="text-[#8BC34A]" />;
      case "휴식":
        return <FiCoffee className="text-[#8BC34A]" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] mx-4 bg-gradient-to-br from-green-200 to-[#F0F9EE] p-7 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{tip.emoji}</span>
          <div className="flex flex-col items-start">
            <span className="text-[#333333] font-bold text-lg tracking-tight font-ibm">
              오늘의 마음 관리
            </span>
            <div className="flex items-center gap-2 mt-1">
              {getCategoryIcon(tip.category)}
              <span className="text-[#8BC34A] text-sm font-semibold font-ibm">
                {tip.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 text-[#666666] text-sm leading-relaxed ">
        {tip.text}
      </div>
    </motion.div>
  );
};

export default WellnessTipCard;
