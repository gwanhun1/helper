import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import { formatDate } from "../../utils/date";

interface Record {
  id: string;
  date: string;
  content: string;
  level?: number;
}

interface RecentRecordsProps {
  records: Record[];
}

const RecentRecords = ({ records }: RecentRecordsProps) => {
  const getEmotionEmoji = (level: number) => {
    if (level >= 4) return "😊";
    if (level >= 2) return "😐";
    return "😔";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white mx-4 rounded-[22px] p-5 shadow-[0_2px_16px_rgb(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-green-50 p-2 rounded-full">
            <FiClock className="text-green-600 text-base" />
          </div>
          <span className="text-[13px] font-bold text-gray-900">최근 기록</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-[11px] text-green-600 font-bold px-3 py-1.5 rounded-full bg-green-50"
          onClick={() => (window.location.href = "/Worry")}
        >
          전체보기
        </motion.button>
      </div>

      <div className="space-y-3">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-gray-50 rounded-[18px] hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-gray-500">
                  {formatDate(record.date).date}
                </span>
                <span className="text-gray-300 text-[10px]">•</span>
                <span className="text-[11px] text-gray-500">{formatDate(record.date).time}</span>
              </div>
              <span className="text-lg" role="img" aria-label="emotion">
                {record.level ? getEmotionEmoji(record.level) : null}
              </span>
            </div>
            <p className="text-[13px] text-gray-700 line-clamp-2 leading-[1.6]">
              {record.content}
            </p>
          </motion.div>
        ))}

        {records.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[13px] font-bold text-gray-500">아직 기록이 없습니다</p>
            <p className="text-[11px] mt-1 text-gray-400">
              새로운 기록을 남겨보세요!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecentRecords;
