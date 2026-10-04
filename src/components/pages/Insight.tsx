import { useState } from "react";
import { Link } from "react-router-dom";
import useUserContents from "../../hooks/useUserContents";
import PageLayout from "../organisms/PageLayout";
import EmotionChart from "../molecules/EmotionChart";
import { moodBucket } from "../../utils/mood";
const Insight = () => {
  const { userContents, loading, error, refreshUserContents } =
    useUserContents();
  const [period, setPeriod] = useState(30);
  const since = period ? Date.now() - period * 86400000 : 0;
  const records = userContents.filter((item) => item.timestamp >= since);
  const moods = records.filter((item) => item.level !== undefined);
  const counts = { good: 0, neutral: 0, bad: 0 };
  const weekdays = Array<number>(7).fill(0);
  const hours = [0, 0, 0, 0];
  records.forEach((record) => {
    const date = new Date(record.date);
    if (isNaN(date.getTime())) return;
    const korea = new Date(date.getTime() + 9 * 3600000);
    weekdays[korea.getUTCDay()]++;
    const h = korea.getUTCHours();
    hours[
      h >= 5 && h < 12 ? 0 : h >= 12 && h < 17 ? 1 : h >= 17 && h < 21 ? 2 : 3
    ]++;
  });
  moods.forEach((item) => counts[moodBucket(item.level!)]++);
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto p-5 space-y-5">
        <div>
          <Link to="/user" className="text-sm underline text-emerald-800">
            내 정보로 돌아가기
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            나의 기분 리포트
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            직접 선택한 기분과 기록 습관을 돌아봐요. 감정 진단이나 AI 분석
            결과가 아니에요.
          </p>
        </div>
        <div role="group" aria-label="조회 기간" className="flex gap-2">
          {[7, 30, 0].map((days) => (
            <button
              key={days}
              aria-pressed={period === days}
              onClick={() => setPeriod(days)}
              className={`rounded-xl px-4 min-h-11 text-sm border ${period === days ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-slate-600 border-slate-200"}`}
            >
              {days ? `최근 ${days}일` : "전체"}
            </button>
          ))}
        </div>
        {error ? (
          <div
            role="alert"
            className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
            <button
              onClick={() => void refreshUserContents()}
              className="block mt-3 underline"
            >
              다시 불러오기
            </button>
          </div>
        ) : loading ? (
          <p role="status">기록을 불러오고 있어요</p>
        ) : !records.length ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-800">
              이 기간에는 기록이 없어요
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              다른 기간을 선택하거나 첫 마음을 기록해보세요.
            </p>
            <Link
              to="/worry?compose=1"
              className="inline-block mt-4 px-4 py-3 rounded-xl bg-emerald-700 text-white text-sm"
            >
              마음 기록하기
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white border border-slate-200 p-4">
                <p className="text-sm text-slate-600">마음 기록</p>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {records.length}회
                </p>
              </div>
              <div className="rounded-xl bg-white border border-slate-200 p-4">
                <p className="text-sm text-slate-600">직접 고른 기분</p>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {moods.length}회
                </p>
              </div>
            </div>
            <EmotionChart chartData={moods.slice(-7)} loading={false} />
            <section className="rounded-2xl bg-white border border-slate-200 p-5">
              <h2 className="font-semibold text-slate-800">기분의 분포</h2>
              <p className="text-xs text-slate-600 mt-2">
                기분을 고른 {moods.length}회 기준 · 과거 자동 생성 점수 제외
              </p>
              <div className="mt-4 space-y-4">
                {[
                  { key: "good" as const, label: "편안함 · 기분 좋음 (4–5)" },
                  { key: "neutral" as const, label: "보통 (3)" },
                  { key: "bad" as const, label: "지침 · 힘듦 (1–2)" },
                ].map((row) => (
                  <div key={row.key}>
                    <div className="flex justify-between text-sm text-slate-700">
                      <span>{row.label}</span>
                      <span>{counts[row.key]}회</span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{
                          width: `${moods.length ? (counts[row.key] / moods.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl bg-white border border-slate-200 p-5">
              <h2 className="font-semibold text-slate-800">기록하는 요일</h2>
              <div className="grid grid-cols-7 gap-2 mt-4">
                {weekdays.map((count, i) => (
                  <div key={i} className="text-center">
                    <p className="text-sm text-slate-600">
                      {["일", "월", "화", "수", "목", "금", "토"][i]}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-emerald-800">
                      {count}회
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl bg-white border border-slate-200 p-5">
              <h2 className="font-semibold text-slate-800">
                기록하는 시간 · 한국 시간
              </h2>
              <div className="mt-4 space-y-3">
                {[
                  "아침 · 05–12시",
                  "오후 · 12–17시",
                  "저녁 · 17–21시",
                  "밤 · 21–05시",
                ].map((label, i) => (
                  <div
                    key={label}
                    className="flex justify-between text-sm text-slate-700"
                  >
                    <span>{label}</span>
                    <span>{hours[i]}회</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </PageLayout>
  );
};
export default Insight;
