import { formatDate } from "../../utils/date";
import { moodLabel, moodEmoji } from "../../utils/mood";
interface Props {
  averageLevel?: number | string;
  chartData: Array<{ date: string; level?: number }>;
  loading: boolean;
}
const EmotionChart = ({ chartData, loading }: Props) => {
  const records = chartData.filter((record) => record.level !== undefined);
  if (loading)
    return (
      <div
        role="status"
        className="mx-4 p-6 rounded-2xl bg-white border border-slate-200 text-sm text-slate-600"
      >
        기분 기록을 불러오고 있어요
      </div>
    );
  if (!records.length)
    return (
      <section className="mx-4 p-6 rounded-2xl bg-white border border-slate-200">
        <h2 className="text-base font-semibold text-slate-800">
          기분 변화를 기록해보세요
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          직접 고른 기분이 쌓이면 최근 기록의 변화를 보여드려요. 과거 자동 생성
          점수는 포함하지 않아요.
        </p>
      </section>
    );
  const average =
    records.reduce((sum, record) => sum + record.level!, 0) / records.length;
  const coordinates = records
    .map(
      (record, i) =>
        `${records.length === 1 ? 150 : 20 + (i * 260) / (records.length - 1)},${130 - (record.level! - 1) * 27.5}`,
    )
    .join(" ");
  return (
    <section className="mx-4 p-5 rounded-2xl bg-white border border-slate-200">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-800">
          최근 기분 기록
        </h2>
        <span className="text-sm font-semibold text-emerald-800">
          평균 {average.toFixed(1)} / 5
        </span>
      </div>
      <p className="text-xs text-slate-600 mt-2">
        직접 선택한 최근 {records.length}회 기분 · {moodLabel(average)}
      </p>
      <svg
        viewBox="0 0 300 160"
        role="img"
        aria-label={`최근 ${records.length}회 기분 추이. ${records.map((record) => `${formatDate(record.date).date}: ${moodLabel(record.level)}`).join(", ")}`}
        className="mt-3 w-full h-36"
      >
        {[20, 75, 130].map((y) => (
          <line key={y} x1="10" x2="290" y1={y} y2={y} stroke="#e2e8f0" />
        ))}
        <polyline
          points={coordinates}
          fill="none"
          stroke="#047857"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {records.map((record, i) => (
          <circle
            key={`${record.date}-${i}`}
            cx={
              records.length === 1 ? 150 : 20 + (i * 260) / (records.length - 1)
            }
            cy={130 - (record.level! - 1) * 27.5}
            r="5"
            fill="#047857"
          >
            <title>
              {formatDate(record.date).date}: {moodLabel(record.level)}
            </title>
          </circle>
        ))}
      </svg>
      <div className="flex gap-2 justify-between text-xs text-slate-600">
        {records.map((record, i) => (
          <div key={`${record.date}-${i}`} className="text-center min-w-0">
            <span aria-hidden="true" className="block text-lg">
              {moodEmoji(record.level)}
            </span>
            <span>{formatDate(record.date).date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default EmotionChart;
