import React from "react";
import PageLayout from "../organisms/PageLayout";
import useUserContents from "../../hooks/useUserContents";
import { motion } from "framer-motion";
import { FiTrendingUp, FiPieChart, FiBarChart2, FiAward, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";
import Title from "../atoms/Title";
import Text from "../atoms/Text";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Radar, Pie } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

const Insight = () => {
  const { userContents, loading } = useUserContents();
  const navigate = useNavigate();

  if (loading) {
    return (
      <PageLayout requireAuth>
        <div className="flex items-center justify-center h-[70vh]">
          <Loading />
        </div>
      </PageLayout>
    );
  }

  // 데이터 분석 로직
  const totalCount = userContents.length;
  const moodLevels = userContents.map(item => item.level || 0);
  const avgMood = totalCount > 0 ? (moodLevels.reduce((a, b) => a + b, 0) / totalCount).toFixed(1) : 0;

  // 감정 분포 (Pie Chart용)
  const moodCounts = {
    good: moodLevels.filter(l => l >= 6).length,
    neutral: moodLevels.filter(l => l >= 3 && l < 6).length,
    bad: moodLevels.filter(l => l < 3).length,
  };

  const pieData = {
    labels: ["평온함", "안정적", "힘듦"],
    datasets: [
      {
        data: [moodCounts.good, moodCounts.neutral, moodCounts.bad],
        backgroundColor: [
          "rgba(139, 195, 74, 0.7)",
          "rgba(255, 193, 7, 0.7)",
          "rgba(244, 67, 54, 0.7)",
        ],
        borderColor: [
          "#8BC34A",
          "#FFC107",
          "#F44336",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 키워드 분석 (임시 로직: 간단한 단어 추출)
  const allText = userContents.map(item => item.content).join(" ");
  const keywords = ["사랑", "회사", "공부", "미래", "친구", "가족", "휴식"]
    .map(key => ({ text: key, count: (allText.match(new RegExp(key, "g")) || []).length }))
    .filter(k => k.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <PageLayout requireAuth>
      <div className="px-4 pb-10 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 py-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
            <FiArrowLeft size={24} />
          </button>
          <Title>마음 상세 리포트</Title>
        </div>

        {/* AI Insight Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <FiAward size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">AI 분석</span>
              <span className="text-white/80 text-xs">최근 30일 데이터 기준</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">당신은 회복 탄력성이<br />뛰어난 사람입니다! ✨</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              최근 {totalCount}번의 기록을 분석한 결과, 힘든 순간이 와도 스스로 답을 찾아내려 노력하는 경향이 보여요. 평균 감정 지수는 {avgMood}점으로 나타났습니다.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="text-orange-500 bg-orange-50 p-3 rounded-xl mb-2">
              <FiTrendingUp size={24} />
            </div>
            <Text className="text-xs text-gray-500">평균 감정 점수</Text>
            <div className="text-xl font-bold">{avgMood}점</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="text-blue-500 bg-blue-50 p-3 rounded-xl mb-2">
              <FiPieChart size={24} />
            </div>
            <Text className="text-xs text-gray-500">누적 마음 기록</Text>
            <div className="text-xl font-bold">{totalCount}회</div>
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <FiBarChart2 className="text-purple-500" />
            <h3 className="font-bold text-gray-800">감정 분포도</h3>
          </div>
          <div className="h-48 flex justify-center">
            {totalCount > 0 ? (
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <p className="text-sm">기록을 시작하면 분포도가 나타나요</p>
              </div>
            )}
          </div>
        </div>

        {/* Keyword Cloud */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">가장 많이 쓴 단어</h3>
          <div className="flex flex-wrap gap-2">
            {keywords.length > 0 ? (
              keywords.map((k, idx) => (
                <span 
                  key={idx}
                  className={`px-4 py-2 rounded-2xl font-medium ${
                    idx === 0 ? "bg-indigo-100 text-indigo-600 text-lg" : 
                    idx < 3 ? "bg-purple-100 text-purple-600 text-sm" : 
                    "bg-gray-100 text-gray-500 text-xs"
                  }`}
                >
                  #{k.text}
                </span>
              ))
            ) : (
              <Text className="text-gray-400 text-sm italic w-full text-center py-4">
                기록이 쌓이면 나만의 키워드가 나타납니다.
              </Text>
            )}
          </div>
        </div>

        {/* Footer Advice */}
        <div className="bg-[#f8f9fa] p-6 rounded-3xl border border-dashed border-gray-300">
          <h4 className="font-bold text-gray-700 mb-2">오늘의 마음 제안 💌</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            분석에 따르면 당신은 밤 9시 이후에 고민 기록이 많은 편이에요. 
            자기 전 10분만 명상을 하거나 따뜻한 차를 마셔보는 건 어떨까요?
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Insight;
