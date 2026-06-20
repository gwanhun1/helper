import { useMemo } from "react";
import PageLayout from "../organisms/PageLayout";
import useUserContents from "../../hooks/useUserContents";
import { motion } from "framer-motion";
import { FiTrendingUp, FiMessageCircle, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" },
});

const SectionCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div {...fadeUp(delay)} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
    {children}
  </motion.div>
);

const CardTitle = ({ title, sub }: { title: string; sub: string }) => (
  <div className="mb-4">
    <p className="text-sm font-extrabold text-slate-800">{title}</p>
    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{sub}</p>
  </div>
);

const Insight = () => {
  const { userContents, loading } = useUserContents();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (!userContents.length) return null;
    const totalCount = userContents.length;
    const moodLevels = userContents.map((item) => item.level || 0);
    const avgMood = (moodLevels.reduce((a, b) => a + b, 0) / totalCount).toFixed(1);

    const dayStats = Array(7).fill(0) as number[];
    const timeStats = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    userContents.forEach((item) => {
      if (!item.date) return;
      const date = new Date(item.date);
      if (isNaN(date.getTime())) return;
      dayStats[date.getDay()]++;
      const hour = date.getHours();
      if (hour >= 5 && hour < 12) timeStats.morning++;
      else if (hour >= 12 && hour < 17) timeStats.afternoon++;
      else if (hour >= 17 && hour < 21) timeStats.evening++;
      else timeStats.night++;
    });

    const good = moodLevels.filter((l) => l >= 6).length;
    const neutral = moodLevels.filter((l) => l >= 3 && l < 6).length;
    const bad = moodLevels.filter((l) => l < 3).length;

    return { totalCount, avgMood, dayStats, timeStats, moodCounts: { good, neutral, bad } };
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

  const avgNum = Number(stats?.avgMood ?? 0);
  const total = stats?.totalCount ?? 0;

  const topTimeEntry = stats
    ? (Object.entries(stats.timeStats) as [string, number][]).sort((a, b) => b[1] - a[1])[0]
    : null;
  const topTimeLabel: Record<string, string> = {
    morning: "아침", afternoon: "오후", evening: "저녁", night: "밤",
  };

  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
  const maxDay = Math.max(...(stats?.dayStats ?? [0]));

  const moodRows = [
    { label: "평온함", emoji: "😊", value: stats?.moodCounts.good ?? 0, color: "bg-emerald-400" },
    { label: "안정적", emoji: "😐", value: stats?.moodCounts.neutral ?? 0, color: "bg-slate-300" },
    { label: "힘듦",  emoji: "😔", value: stats?.moodCounts.bad ?? 0,  color: "bg-rose-400" },
  ];

  const timeRows = [
    { label: "아침", key: "morning",   icon: "🌅", time: "05–12시", value: stats?.timeStats.morning   ?? 0 },
    { label: "오후", key: "afternoon", icon: "☀️", time: "12–17시", value: stats?.timeStats.afternoon ?? 0 },
    { label: "저녁", key: "evening",   icon: "🌆", time: "17–21시", value: stats?.timeStats.evening   ?? 0 },
    { label: "밤",   key: "night",     icon: "🌙", time: "21–05시", value: stats?.timeStats.night     ?? 0 },
  ];
  const maxTime = Math.max(...timeRows.map((t) => t.value), 1);

  return (
    <PageLayout requireAuth>
      <div className="bg-[#FAFAFA] min-h-screen pb-24">

        {/* 히어로 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-6 pt-7 pb-8">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-teal-200/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 border border-white/60 shadow-sm text-slate-500 hover:text-emerald-500 transition-colors"
            >
              <FiArrowLeft size={17} />
            </button>
            <div>
              <p className="text-base font-extrabold text-slate-800">마음 리포트</p>
              <p className="text-[10px] text-slate-400 font-medium">AI 감정 분석 대시보드</p>
            </div>
          </div>

          <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/80 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI 감정 분석</p>
            <p className="text-[17px] font-extrabold text-slate-800 leading-snug">
              {avgNum >= 5 ? "회복 탄력성이 좋은 시기예요 ✨" : "조금은 쉬어가도 괜찮아요 🌿"}
            </p>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">
              {total}개 기록 분석 · 평균 마음 온도{" "}
              <span className="text-emerald-500 font-bold">{stats?.avgMood}점</span>
            </p>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-3">

          {/* 스탯 */}
          <motion.div {...fadeUp(0)} className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-400 shrink-0">
                <FiTrendingUp size={17} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">평균 온도</p>
                <p className="text-xl font-black text-slate-800">{stats?.avgMood}<span className="text-xs text-slate-300 font-bold"> /10</span></p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                <FiMessageCircle size={17} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">마음 조각</p>
                <p className="text-xl font-black text-slate-800">{total}<span className="text-xs text-slate-300 font-bold"> 개</span></p>
              </div>
            </div>
          </motion.div>

          {/* 감정 분포 — 가로 바 */}
          <SectionCard delay={0.05}>
            <CardTitle title="마음 분포도" sub="감정 비율 분석" />
            {total > 0 ? (
              <div className="space-y-3">
                {moodRows.map((row) => {
                  const pct = total > 0 ? Math.round((row.value / total) * 100) : 0;
                  return (
                    <div key={row.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-600">
                          {row.emoji} {row.label}
                        </span>
                        <span className="text-xs font-black text-slate-400">
                          {row.value}회 <span className="text-slate-300 font-medium">· {pct}%</span>
                        </span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, ease: [0.34, 1.2, 0.64, 1], delay: 0.1 }}
                          className={`h-full rounded-full ${row.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-200">
                <span className="text-xs text-slate-400 font-semibold">데이터가 부족합니다</span>
              </div>
            )}
          </SectionCard>

          {/* 요일별 기록 — 커스텀 바 */}
          <SectionCard delay={0.1}>
            <CardTitle title="요일별 기록" sub="주간 활동 현황" />
            {total > 0 ? (
              <div className="flex items-end justify-between gap-1.5 h-28">
                {dayLabels.map((day, i) => {
                  const val = stats?.dayStats[i] ?? 0;
                  const heightPct = maxDay > 0 ? (val / maxDay) * 100 : 0;
                  const isMax = val === maxDay && val > 0;
                  return (
                    <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                      <span className={`text-[10px] font-black ${isMax ? "text-emerald-500" : "text-slate-300"}`}>
                        {val > 0 ? val : ""}
                      </span>
                      <div className="w-full flex items-end" style={{ height: "72px" }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(heightPct, val > 0 ? 8 : 0)}%` }}
                          transition={{ duration: 0.7, delay: 0.05 * i, ease: "easeOut" }}
                          className={`w-full rounded-lg ${isMax ? "bg-emerald-400" : val > 0 ? "bg-emerald-200" : "bg-slate-100"}`}
                        />
                      </div>
                      <span className={`text-[11px] font-bold ${isMax ? "text-emerald-500" : "text-slate-400"}`}>{day}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-200">
                <span className="text-xs text-slate-400 font-semibold">데이터가 부족합니다</span>
              </div>
            )}
          </SectionCard>

          {/* 시간대 — 가로 바 + 아이콘 */}
          <SectionCard delay={0.15}>
            <CardTitle title="시간대별 기록" sub="언제 마음을 나누나요?" />
            <div className="space-y-3">
              {timeRows.map((t) => {
                const pct = maxTime > 0 ? Math.round((t.value / maxTime) * 100) : 0;
                const isTop = topTimeEntry?.[0] === t.key && t.value > 0;
                return (
                  <div key={t.key} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${isTop ? "bg-emerald-50" : "bg-slate-50"}`}>
                      {t.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[11px] font-bold ${isTop ? "text-emerald-600" : "text-slate-600"}`}>
                          {t.label}
                          <span className="text-[9px] font-medium text-slate-400 ml-1">{t.time}</span>
                        </span>
                        <span className={`text-[11px] font-black ${isTop ? "text-emerald-500" : "text-slate-300"}`}>
                          {t.value}회
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
                          className={`h-full rounded-full ${isTop ? "bg-emerald-400" : "bg-slate-200"}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* AI 제안 */}
          {topTimeEntry && (
            <motion.div
              {...fadeUp(0.2)}
              className="bg-slate-800 rounded-2xl p-5 text-white relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400/15 rounded-full blur-2xl" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI 맞춤 제안 💌</p>
              <p className="text-sm leading-relaxed text-slate-300 font-medium">
                최근{" "}
                <span className="text-emerald-400 font-bold">{topTimeLabel[topTimeEntry[0]]} 시간대</span>{" "}
                기록이 많아요.{" "}
                {topTimeEntry[0] === "night"
                  ? "잠들기 전 5분 명상이 내일의 마음 온도를 높여줄 거예요."
                  : "이 시간을 활용해 꾸준히 마음을 돌아보는 습관을 만들어봐요."}
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </PageLayout>
  );
};

export default Insight;
