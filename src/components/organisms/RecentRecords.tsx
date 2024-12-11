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
    if (level < 3) return "😊";
    if (level < 6) return "😐";
    return "😔";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-gray-700">
          <FiClock className="text-green-500 text-lg" />
          <span className="font-semibold text-gray-700">최근 기록</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-green-500 hover:text-green-600 font-medium px-3 py-1 rounded-full hover:bg-green-50 transition-colors"
          onClick={() => (window.location.href = "/Worry")}
        >
          전체보기
        </motion.button>
      </div>

      <div className="space-y-4">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium">
                  {formatDate(record.date).date}
                </span>
                <span className="text-gray-300">|</span>
                <span>{formatDate(record.date).time}</span>
              </div>
              <span className="text-xl" role="img" aria-label="emotion">
                {record.level ? getEmotionEmoji(record.level) : null}
              </span>
            </div>
            <p className="text-gray-700 line-clamp-2 leading-relaxed">
              {record.content}
            </p>
          </motion.div>
        ))}

        {records.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg font-medium">아직 기록이 없습니다</p>
            <p className="text-sm mt-2 text-gray-400">
              새로운 기록을 남겨보세요!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecentRecords;
