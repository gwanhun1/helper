import PageLayout from "../organisms/PageLayout";
import AuthAlert from "../molecules/AuthAlert";
import { motion } from "framer-motion";
import useWorryData from "../../hooks/useWorryData";
import { FiCalendar, FiClock, FiHeart } from "react-icons/fi";
import { formatDate } from "../../utils/date";

const Home = () => {
  const { data: forestData } = useWorryData();

  const getAverageLevel = () => {
    if (!forestData || forestData.length === 0) return 0;
    const sum = forestData.reduce((acc, item) => acc + item.level, 0);
    return (sum / forestData.length).toFixed(2);
  };

  const getRecentMood = () => {
    if (!forestData || forestData.length === 0) return "아직 기록이 없습니다";
    const lastItem = forestData[forestData.length - 1];
    return lastItem.level < 3
      ? "긍정적"
      : lastItem.level < 6
      ? "보통"
      : "부정적";
  };

  const getEmotionEmoji = (level: number) => {
    if (level < 3) return "😊";
    if (level < 6) return "😐";
    return "😔";
  };

  const getRecentRecords = () => {
    if (!forestData) return [];
    return forestData.slice(-3).reverse(); // 최근 3개의 기록만 표시
  };

  return (
    <PageLayout requireAuth>
      <div className="flex flex-col space-y-4 p-4">
        {/* 감정 상태 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-100 rounded-xl p-6 text-center shadow-sm"
        >
          <div className="text-6xl font-bold text-blue-500 mb-2">
            {getAverageLevel()}
          </div>
          <div className="text-blue-600 mb-1">
            마음이 차분하고 안정적입니다.
          </div>
          <div className="text-blue-400 text-sm">계속 잘 유지하세요!</div>
        </motion.div>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <FiCalendar />
              <span className="font-semibold">기록 횟수</span>
            </div>
            <div className="text-2xl font-bold">
              {forestData?.length || 0}회
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-rose-500 mb-2">
              <FiHeart />
              <span className="font-semibold">현재 감정</span>
            </div>
            <div className="text-2xl font-bold">{getRecentMood()}</div>
          </motion.div>
        </div>

        {/* 최근 기록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FiClock className="text-green-500" />
              <span className="font-semibold">최근 기록</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-green-500 hover:text-green-600"
              onClick={() => (window.location.href = "/log")}
            >
              전체보기
            </motion.button>
          </div>

          <div className="space-y-3">
            {getRecentRecords().map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(record.date).date}</span>
                    <span>|</span>
                    <span>{formatDate(record.date).time}</span>
                  </div>
                  <span className="text-xl" role="img" aria-label="emotion">
                    {getEmotionEmoji(record.level)}
                  </span>
                </div>
                <p className="text-gray-700 line-clamp-2">{record.content}</p>
              </motion.div>
            ))}

            {(!forestData || forestData.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p>아직 기록이 없습니다</p>
                <p className="text-sm mt-2">새로운 기록을 남겨보세요!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <AuthAlert />
    </PageLayout>
  );
};

export default Home;
