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
import { Pie } from "react-chartjs-2";

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

  const totalCount = userContents.length;
  const moodLevels = userContents.map(item => item.level || 0);
  const avgMood = totalCount > 0 ? (moodLevels.reduce((a, b) => a + b, 0) / totalCount).toFixed(1) : 0;

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
          "rgba(122, 196, 167, 0.8)",
          "rgba(240, 249, 245, 0.8)",
          "rgba(255, 107, 107, 0.8)",
        ],
        borderColor: [
          "#7ac4a7",
          "#d4efe3",
          "#ff6b6b",
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const allText = userContents.map(item => item.content).join(" ");
  const keywords = ["사랑", "회사", "공부", "미래", "친구", "가족", "휴식"]
    .map(key => ({ text: key, count: (allText.match(new RegExp(key, "g")) || []).length }))
    .filter(k => k.count > 0)
    .sort((a, b) => b.count - a.count);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PageLayout requireAuth>
      <div className="min-h-screen bg-[#FDFDFD] px-6 pb-24 space-y-8 overflow-x-hidden pt-4">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-green transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
          <Title>마음 상세 리포트</Title>
        </div>

        {/* Brand AI Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-green rounded-[40px] p-8 text-white shadow-2xl shadow-green/20"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20 transform rotate-12">
            <FiAward size={120} />
          </div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                AI Deep Insight
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              회복 탄력성이 <br />참 아름다운 당신이에요 ✨
            </h2>
            <p className="text-white/90 text-sm leading-relaxed max-w-[90%]">
              기록된 {totalCount}개의 마음을 분석해보니, 힘든 일이 있어도 스스로 다시 서는 힘이 느껴져요. 
              당신의 평균 마음 온도는 <span className="font-extrabold">{avgMood}점</span>입니다.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4"
        >
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-between h-40">
            <div className="w-10 h-10 bg-orange-50 text-orange-400 rounded-2xl flex items-center justify-center">
              <FiTrendingUp size={20} />
            </div>
            <div>
              <Text variant="caption" color="secondary" weight="bold" className="mb-1 uppercase tracking-wider text-[10px]">평균 감정 온도</Text>
              <div className="text-2xl font-black text-slate-800 tracking-tight">{avgMood} <span className="text-sm font-normal text-gray-400">/ 10</span></div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-between h-40">
            <div className="w-10 h-10 bg-blue-50 text-blue-400 rounded-2xl flex items-center justify-center">
              <FiPieChart size={20} />
            </div>
            <div>
              <Text variant="caption" color="secondary" weight="bold" className="mb-1 uppercase tracking-wider text-[10px]">누적 마음 조각</Text>
              <div className="text-2xl font-black text-slate-800 tracking-tight">{totalCount} <span className="text-sm font-normal text-gray-400">개</span></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mood Distribution Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 bg-green/10 rounded-lg text-green font-bold text-xs uppercase tracking-widest">
              Mood Map
            </div>
            <h3 className="font-bold text-slate-800 text-lg tracking-tight">마음 분포</h3>
          </div>
          <div className="h-56 relative">
            {totalCount > 0 ? (
              <Pie 
                data={pieData} 
                options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 12, weight: 'bold' }
                      }
                    }
                  }
                }} 
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <Text variant="body" color="tertiary" className="italic italic">기록을 채우면 마음 지도가 완성됩니다.</Text>
              </div>
            )}
          </div>
        </motion.div>

        {/* Keyword Cloud Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16" />
          <h3 className="font-bold text-slate-800 text-lg mb-6 relative z-10">생각의 조각들</h3>
          <div className="flex flex-wrap gap-3 relative z-10">
            {keywords.length > 0 ? (
              keywords.map((k, idx) => (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  key={idx}
                  className={`px-5 py-2.5 rounded-full font-bold transition-all ${
                    idx === 0 ? "bg-green text-white shadow-lg shadow-green/20 text-sm" : 
                    idx < 3 ? "bg-green-100 text-green-700 text-sm" : 
                    "bg-gray-100 text-gray-500 text-xs"
                  }`}
                >
                  #{k.text}
                </motion.span>
              ))
            ) : (
              <div className="w-full py-10 text-center">
                <Text variant="body" color="tertiary">아직 모인 언어가 없습니다.</Text>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Suggestion */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-40 h-40 bg-green/20 rounded-full blur-3xl" />
           <div className="relative z-10">
            <h4 className="font-bold text-xl mb-3 flex items-center gap-2">오늘의 제안 💌</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              최근 밤 9시 이후의 기록이 늘었어요. 자기 전 스마트폰보다는 <br />
              <span className="text-green font-bold">따뜻한 차 한 잔</span>과 함께 오늘을 마무리해보는 건 어떨까요?
            </p>
           </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Insight;
