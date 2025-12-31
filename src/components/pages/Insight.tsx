import React, { useMemo } from "react";
import PageLayout from "../organisms/PageLayout";
import useUserContents from "../../hooks/useUserContents";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiPieChart,
  FiAward,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiSmile,
} from "react-icons/fi";
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
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const Insight = () => {
  const { userContents, loading } = useUserContents();
  const navigate = useNavigate();

  // 데이터 분석 로직 강화
  const stats = useMemo(() => {
    if (!userContents.length) return null;

    const totalCount = userContents.length;
    const moodLevels = userContents.map((item) => item.level || 0);
    const avgMood = (
      moodLevels.reduce((a, b) => a + b, 0) / totalCount
    ).toFixed(1);

    // 요일별 분석
    const dayStats = Array(7).fill(0);
    const timeStats = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    userContents.forEach((item) => {
      const date = new Date(item.date);
      dayStats[date.getDay()]++;

      const hour = date.getHours();
      if (hour >= 5 && hour < 12) timeStats.morning++;
      else if (hour >= 12 && hour < 17) timeStats.afternoon++;
      else if (hour >= 17 && hour < 21) timeStats.evening++;
      else timeStats.night++;
    });

    const moodCounts = {
      good: moodLevels.filter((l) => l >= 6).length,
      neutral: moodLevels.filter((l) => l >= 3 && l < 6).length,
      bad: moodLevels.filter((l) => l < 3).length,
    };

    return { totalCount, avgMood, dayStats, timeStats, moodCounts };
  }, [userContents]);

  if (loading) {
    return (
      <PageLayout requireAuth>
        <div className="flex items-center justify-center h-[70vh]">
          <Loading />
        </div>
      </PageLayout>
    );
  }

  const pieData = {
    labels: ["평온함", "안정적", "힘듦"],
    datasets: [
      {
        data:
          stats && stats.totalCount > 0
            ? [
                stats.moodCounts.good,
                stats.moodCounts.neutral,
                stats.moodCounts.bad,
              ]
            : [],
        backgroundColor: [
          "rgba(122, 196, 167, 0.8)",
          "rgba(148, 163, 184, 0.2)",
          "rgba(255, 107, 107, 0.8)",
        ],
        borderColor: ["#7ac4a7", "#cbd5e1", "#ff6b6b"],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const barData = {
    labels: ["일", "월", "화", "수", "목", "금", "토"],
    datasets: [
      {
        label: "기록 횟수",
        data: stats?.dayStats || [],
        backgroundColor: "rgba(122, 196, 167, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageLayout requireAuth>
      <div className="min-h-screen bg-[#FDFDFD] px-6 pb-24 space-y-6 overflow-x-hidden pt-4 relative">
        <div className="overflow-hidden absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-green/3 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-500/3 blur-[100px] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex relative z-10 justify-between items-center py-3">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex justify-center items-center w-10 h-10 text-slate-400 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:text-green hover:shadow-md hover:-translate-y-0.5"
            >
              <FiArrowLeft size={20} />
            </button>
            <div className="flex flex-col gap-0.5">
              <Title>마음 상세 리포트</Title>
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                감정 분석 대시보드
              </span>
            </div>
          </div>
        </div>

        {/* AI Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-[32px] p-7 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] z-10"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] transform scale-125 rotate-12">
            <FiAward size={160} />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex gap-2 items-center px-3 py-1 rounded-full border bg-green/10 border-green/5">
              <FiSmile className="text-xs text-green" />
              <span className="text-[9px] font-black text-green tracking-widest">
                AI 감정 분석
              </span>
            </div>
            <h2 className="text-[22px] font-black leading-tight tracking-tight text-slate-800">
              {stats?.avgMood && Number(stats.avgMood) >= 5
                ? "회복 탄력성이 참 아름다운 당신이에요 ✨"
                : "조금은 쉬어가도 괜찮은 시기에요 🌿"}
            </h2>
            <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
              {stats?.totalCount}개의 마음 조각을 분석한 결과, 평균 마음 온도는{" "}
              <span className="font-black text-green">{stats?.avgMood}점</span>
              입니다.
              {Number(stats?.avgMood) >= 5
                ? " 긍정적인 에너지가 잘 유지되고 있어요."
                : " 마음의 소리에 조금 더 귀 기울여보는 건 어떨까요?"}
            </p>
          </div>
        </motion.div>

        {/* Stats Quick Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid relative z-10 grid-cols-2 gap-3"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-lg p-5 rounded-[24px] shadow-sm border border-white/80 flex flex-col justify-between h-32"
          >
            <div className="flex justify-center items-center w-9 h-9 text-orange-500 bg-orange-50 rounded-xl shadow-inner">
              <FiTrendingUp size={18} />
            </div>
            <div>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block mb-1">
                평균 온도
              </span>
              <div className="text-xl font-black tracking-tighter text-slate-800">
                {stats?.avgMood}{" "}
                <span className="text-xs font-bold text-slate-300">/ 10</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-lg p-5 rounded-[24px] shadow-sm border border-white/80 flex flex-col justify-between h-32"
          >
            <div className="flex justify-center items-center w-9 h-9 text-blue-500 bg-blue-50 rounded-xl shadow-inner">
              <FiPieChart size={18} />
            </div>
            <div>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block mb-1">
                마음 조각
              </span>
              <div className="text-xl font-black tracking-tighter text-slate-800">
                {stats?.totalCount}{" "}
                <span className="text-xs font-bold text-slate-300">개</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Chart Section */}
        <div className="grid relative z-10 grid-cols-1 gap-4">
          {/* Mood Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-lg p-7 rounded-[28px] shadow-sm border border-white/80"
          >
            <div className="flex flex-col gap-1 mb-6">
              <h3 className="text-base font-black text-slate-800">
                마음 분포도
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                감정 비율 분석
              </span>
            </div>
            <div className="relative h-52">
              {stats?.totalCount ? (
                <Pie
                  data={pieData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          usePointStyle: true,
                          padding: 16,
                          font: { size: 11, weight: "bold" },
                          color: "#64748b",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex justify-center items-center h-full rounded-2xl border border-dashed bg-slate-50 border-slate-200">
                  <span className="text-xs italic font-bold text-slate-400">
                    데이터가 부족합니다.
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Activity by Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 backdrop-blur-lg p-7 rounded-[28px] shadow-sm border border-white/80"
          >
            <div className="flex flex-col gap-1 mb-6">
              <h3 className="text-base font-black text-slate-800">
                요일별 기록
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                주간 활동 현황
              </span>
            </div>
            <div className="relative h-44">
              {stats?.totalCount ? (
                <Bar
                  data={barData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { font: { size: 10 } },
                      },
                      x: {
                        grid: { display: false },
                        ticks: { font: { size: 10 } },
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex justify-center items-center h-full rounded-2xl border border-dashed bg-slate-50 border-slate-200">
                  <span className="text-xs italic font-bold text-slate-400">
                    데이터가 부족합니다.
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Time Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-lg p-7 rounded-[28px] shadow-sm border border-white/80"
          >
            <div className="flex flex-col gap-1 mb-5">
              <h3 className="text-base font-black text-slate-800">
                시간대별 기록
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                언제 마음을 나누나요?
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  label: "아침",
                  time: "05-12",
                  count: stats?.timeStats.morning,
                  icon: "🌅",
                },
                {
                  label: "오후",
                  time: "12-17",
                  count: stats?.timeStats.afternoon,
                  icon: "☀️",
                },
                {
                  label: "저녁",
                  time: "17-21",
                  count: stats?.timeStats.evening,
                  icon: "🌆",
                },
                {
                  label: "밤",
                  time: "21-05",
                  count: stats?.timeStats.night,
                  icon: "🌙",
                },
              ].map((t) => (
                <div
                  key={t.label}
                  className="p-3 bg-slate-50 rounded-[18px] flex items-center justify-between group hover:bg-green/5 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black text-slate-800">
                      {t.icon} {t.label}
                    </span>
                    <span className="text-[8px] font-bold text-slate-400">
                      {t.time}
                    </span>
                  </div>
                  <div className="text-base font-black transition-colors text-slate-300 group-hover:text-green">
                    {t.count}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Suggestion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900 rounded-[28px] p-6 text-white relative overflow-hidden shadow-lg z-10"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] bg-green/20" />
          <div className="flex relative z-10 flex-col gap-2">
            <h4 className="text-base font-black">AI 맞춤 제안 💌</h4>
            <p className="text-[12px] leading-relaxed text-slate-300 font-medium">
              최근 <span className="font-bold text-green">밤 시간대</span>{" "}
              기록이 많아지고 있어요. <br />
              잠들기 전 5분간의 명상이 내일의 온도를 <br />
              <span className="font-bold text-white">
                1도 더 높여줄 수 있을 거예요.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Insight;
