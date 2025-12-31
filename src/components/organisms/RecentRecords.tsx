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

  const getEmotionTone = (level?: number) => {
    if (level === undefined)
      return { label: "기록", color: "bg-slate-100 text-slate-600" };
    if (level >= 4)
      return { label: "평온", color: "bg-emerald-100 text-emerald-700" };
    if (level >= 2)
      return { label: "안정", color: "bg-amber-100 text-amber-700" };
    return { label: "힘듦", color: "bg-rose-100 text-rose-700" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 rounded-[24px] p-6 bg-white/80 backdrop-blur-lg border border-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-green-50 to-green/15 text-green shadow-inner">
            <FiClock className="text-lg" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-[2px] text-[10px] font-bold uppercase tracking-[0.18em] rounded-full bg-green/10 text-green">
                Recent
              </span>
            </div>
            <span className="text-[14px] font-extrabold text-slate-800">
              최근 기록
            </span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-[11px] text-green-700 font-bold px-3 py-1.5 rounded-full bg-green/10 border border-green/20"
          onClick={() => (window.location.href = "/worry")}
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
            className="p-4 rounded-[18px] border border-slate-100 bg-white/70 hover:bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <span>{formatDate(record.date).date}</span>
                <span className="text-gray-300 text-[10px]">•</span>
                <span>{formatDate(record.date).time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg" role="img" aria-label="emotion">
                  {record.level !== undefined
                    ? getEmotionEmoji(record.level)
                    : "📝"}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-[11px] font-bold ${
                    getEmotionTone(record.level).color
                  }`}
                >
                  {getEmotionTone(record.level).label}
                </span>
              </div>
            </div>
            <p className="text-[13px] text-gray-800 leading-[1.6] line-clamp-2">
              {record.content}
            </p>
          </motion.div>
        ))}

        {records.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-[13px] font-bold text-gray-500">
              아직 기록이 없습니다
            </p>
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
