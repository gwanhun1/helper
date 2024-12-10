import PageLayout from "../organisms/PageLayout";
import AuthAlert from "../molecules/AuthAlert";
import { motion } from "framer-motion";
import useWorryData from "../../hooks/useWorryData";
import { FiCalendar, FiClock, FiHeart } from "react-icons/fi";
import { formatDate } from "../../utils/date";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { wellnessTips } from "../../data/wellnessTips";
import { FiFeather, FiSun, FiCoffee, FiStar } from "react-icons/fi";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const { data: forestData } = useWorryData();

  // 날짜를 기반으로 팁 선택
  const getTodaysTip = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    const tipIndex = Number(dateString) % wellnessTips.length;
    return wellnessTips[tipIndex];
  };

  const [currentTip] = useState(getTodaysTip);

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

  const getAverageLevel = () => {
    if (!forestData || forestData.length === 0) return 0;
    const sum = forestData.reduce(
      (acc, item) => acc + (item.level !== undefined ? Number(item.level) : 0),
      0
    );
    return (sum / forestData.length).toFixed(2);
  };

  const getRecentMood = () => {
    if (!forestData || forestData.length === 0) return "아직 기록이 없습니다";
    const lastItem = forestData[forestData.length - 1];
    if (!lastItem) return "아직 기록이 없습니다";
    return lastItem && lastItem.level && lastItem.level < 3
      ? "긍정적"
      : lastItem.level && lastItem.level < 6
      ? "중립적"
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

  // 차트 데이터 확인을 위한 로그
  const chartData = forestData?.slice(-7) || [];

  return (
    <PageLayout requireAuth>
      <div className="flex flex-col space-y-4 px-4 pb-4">
        {/* 감정 상태 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-xl pt-6 pb-2 text-center shadow-md hover:shadow-lg transition-shadow border border-blue-100"
        >
          <div className="text-6xl font-bold text-blue-500 mb-3">
            {getAverageLevel()}
          </div>
          <div className="text-blue-600 font-medium">
            마음이 차분하고 안정적입니다.
          </div>
          <div className="text-blue-400 text-sm font-medium">
            계속 잘 유지하세요!
          </div>
          {/* Level 차트 */}
          <div className="flex items-center justify-center mt-2">
            <div className="h-20 w-48">
              <Line
                data={{
                  labels: chartData.map((item) => formatDate(item.date)),
                  datasets: [
                    {
                      label: "감정 레벨",
                      data: chartData.map((item) => item.level),
                      borderColor: "rgb(59, 130, 246)",
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      tension: 0.4,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      display: false,
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1.5,
                    },
                    point: {
                      radius: 2.5,
                      backgroundColor: "rgb(59, 130, 246)",
                      borderColor: "white",
                      borderWidth: 1,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-2 text-green-500 mb-3">
              <FiCalendar className="text-lg" />
              <span className="font-semibold text-gray-700">기록 횟수</span>
            </div>
            <div className="text-xl font-bold text-gray-800">
              {forestData?.length || 0}회
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-2 text-rose-500 mb-3">
              <FiHeart className="text-lg" />
              <span className="font-semibold text-gray-700">현재 감정</span>
            </div>
            <div className="text-xl font-bold text-gray-800">
              {getRecentMood()}
            </div>
          </motion.div>
        </div>
        {/* 오늘의 마음 관리 팁 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-200 to-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentTip.emoji}</span>
              <div className="flex flex-col items-start">
                <span className="text-green-900 font-medium text-lg">
                  오늘의 마음 관리
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {getCategoryIcon(currentTip.category)}
                  <span className="text-green-600 text-xs font-medium">
                    {currentTip.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-700 text-base leading-relaxed">
            {currentTip.text}
          </div>
        </motion.div>

        {/* 최근 기록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-gray-700">
              <FiClock className="text-green-500 text-lg" />
              <span className="font-semibold text-gray-700 ">최근 기록</span>
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
            {getRecentRecords().map((record, index) => (
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

            {(!forestData || forestData.length === 0) && (
              <div className="text-center py-10 text-gray-500">
                <p className="text-lg font-medium">아직 기록이 없습니다</p>
                <p className="text-sm mt-2 text-gray-400">
                  새로운 기록을 남겨보세요!
                </p>
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
