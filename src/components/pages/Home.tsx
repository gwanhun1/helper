import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../organisms/PageLayout";
import useUserContents from "../../hooks/useUserContents";
import useUserStore from "../../store/userStore";
import { FiCalendar, FiHeart, FiArrowRight, FiLock } from "react-icons/fi";
import { wellnessTips } from "../../data/wellnessTips";
import StatCard from "../atoms/StatCard";
import EmotionChart from "../molecules/EmotionChart";
import WellnessTipCard from "../molecules/WellnessTipCard";
import RecentRecords from "../organisms/RecentRecords";
import WorryPromptCarousel from "../molecules/WorryPromptCarousel";
import useStepStore from "../../store/stepStore";
import { moodLabel, koreaDate } from "../../utils/mood";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full bg-gradient-to-b from-emerald-50 to-white px-5 pt-7 pb-8 md:px-10 md:pt-12">
      <div className="max-w-2xl mx-auto">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full">
          🌱 AI와 함께 돌보는 마음
        </span>
        <h1 className="mt-5 text-[30px] md:text-4xl font-bold text-slate-800 leading-tight tracking-tight">
          고민을 내려놓고
          <br />
          마음의 숲을 가꿔요
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          오늘 마음을 적고, AI의 조언을 받아보세요.
          <br />한 번의 기록이 나만의 숲에 나무로 남아요.
        </p>
        <button
          onClick={() => {
            useStepStore.setState({ step: 4 });
            navigate("/worry");
          }}
          className="mt-6 w-full md:w-auto md:px-10 rounded-2xl bg-emerald-700 py-4 text-white font-semibold"
        >
          첫 마음 기록하기
        </button>
        <p className="flex items-center gap-2 mt-3 text-xs text-slate-600">
          <FiLock aria-hidden="true" />
          카카오 로그인 후 이용 · 기본 비공개 · 하루 10회 무료
        </p>
        <section
          aria-label="AI 조언 예시"
          className="mt-7 rounded-2xl bg-white border border-emerald-100 p-5"
        >
          <p className="text-xs font-semibold text-emerald-800">
            이렇게 이야기를 나눠요 · 예시
          </p>
          <p className="mt-3 text-sm text-slate-800">
            “오늘 할 일이 많아 마음이 지쳤어요.”
          </p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed border-l-2 border-emerald-200 pl-3">
            지금 가장 중요한 한 가지부터 골라보면 어떨까요? 쉬는 시간도 오늘의
            계획에 넣어주세요.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            AI가 생성하는 실제 조언은 입력과 선택한 스타일에 따라 달라져요.
          </p>
        </section>
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { title: "마음의 숲", desc: "나만 보는 고민과 조언", emoji: "🌳" },
            {
              title: "기분 리포트",
              desc: "직접 고른 기분의 변화",
              emoji: "📊",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white border border-slate-200 p-4"
            >
              <span aria-hidden="true" className="text-2xl">
                {item.emoji}
              </span>
              <h2 className="text-sm font-bold text-slate-800 mt-2">
                {item.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link
          to="/advice"
          className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div>
            <p className="text-sm font-semibold text-slate-800">
              다른 사람의 고민 둘러보기
            </p>
            <p className="mt-1 text-xs text-slate-600">
              공유된 이야기만 볼 수 있어요 · 로그인 없이 열람
            </p>
          </div>
          <FiArrowRight className="shrink-0 text-emerald-800" />
        </Link>
        <Link
          to="/vent"
          className="block mt-4 text-center text-sm text-emerald-800 underline"
        >
          로그인 없이 감정 풀기
        </Link>
        <p className="mt-6 text-xs text-slate-600 leading-relaxed">
          AI 조언은 전문 상담이나 진단을 대신하지 않아요.{" "}
          <Link to="/guide" className="underline">
            이용 방법과 기록 안내
          </Link>
        </p>
      </div>
    </div>
  );
};
const Home = () => {
  const { user, authReady } = useUserStore();
  const {
    userContents: records,
    loading,
    error,
    refreshUserContents,
  } = useUserContents();
  if (!authReady)
    return (
      <div role="status" className="m-auto text-slate-600">
        마음의 숲을 준비하고 있어요
      </div>
    );
  if (!user)
    return (
      <div className="h-full overflow-y-auto">
        <LandingPage />
      </div>
    );
  const moodRecords = records.filter((record) => record.level !== undefined);
  const recent = moodRecords.slice(-1)[0];
  const average = moodRecords.length
    ? moodRecords.reduce((total, record) => total + record.level!, 0) /
      moodRecords.length
    : 0;
  const tip =
    wellnessTips[Number(koreaDate().replace(/-/g, "")) % wellnessTips.length];
  return (
    <PageLayout>
      <div className="pt-5 pb-6 space-y-4 max-w-3xl mx-auto">
        <WorryPromptCarousel />
        {error ? (
          <div
            role="alert"
            className="mx-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
            <button
              onClick={() => void refreshUserContents()}
              className="block mt-3 underline"
            >
              다시 불러오기
            </button>
          </div>
        ) : (
          <EmotionChart
            averageLevel={average}
            loading={loading}
            chartData={moodRecords.slice(-7)}
          />
        )}
        <div className="grid grid-cols-2 gap-3 px-4">
          <StatCard
            icon={<FiCalendar />}
            title="나의 기록"
            value={loading ? "불러오는 중" : `${records.length}회`}
            iconColor="text-emerald-700"
            iconBgColor="bg-emerald-50"
          />
          <StatCard
            icon={<FiHeart />}
            title="최근 기록한 기분"
            value={loading ? "불러오는 중" : moodLabel(recent?.level)}
            iconColor="text-rose-700"
            iconBgColor="bg-rose-50"
          />
        </div>
        <Link
          to="/insight"
          className="mx-4 flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-emerald-800"
        >
          내 기분 리포트 보기
          <FiArrowRight />
        </Link>
        <WellnessTipCard tip={tip} />
        <RecentRecords records={records.slice(-3).reverse()} />
      </div>
    </PageLayout>
  );
};
export default Home;
