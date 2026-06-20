import PageLayout from "../organisms/PageLayout";
import AuthAlert from "../molecules/AuthAlert";
import useUserContents from "../../hooks/useUserContents";
import useUserStore from "../../store/userStore";
import { FiCalendar, FiHeart, FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { wellnessTips } from "../../data/wellnessTips";
import { useState, useEffect, useRef } from "react";
import StatCard from "../atoms/StatCard";
import EmotionChart from "../molecules/EmotionChart";
import WellnessTipCard from "../molecules/WellnessTipCard";
import RecentRecords from "../organisms/RecentRecords";
import WorryPromptCarousel from "../molecules/WorryPromptCarousel";
import { motion } from "framer-motion";
import { KAKAO_AUTH_URL } from "../molecules/KakaoLogin";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const features = [
  { emoji: "🌳", title: "마음의 숲", desc: "고민을 심으면 나무가 자라요" },
  { emoji: "🤖", title: "AI 조언", desc: "다양한 페르소나의 맞춤 상담" },
  { emoji: "💬", title: "고민 나누기", desc: "익명으로 서로의 이야기를 나눠요" },
  { emoji: "📊", title: "마음 리포트", desc: "감정 패턴을 한눈에 파악해요" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-emerald-50 via-white to-white pb-6">
      {/* 히어로 */}
      <div className="px-6 pt-10 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full mb-4"
        >
          🌱 마음 건강 AI 파트너
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-slate-800 leading-tight tracking-tight"
        >
          고민을 나무처럼<br />천천히 키워가요
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm text-slate-500 leading-relaxed"
        >
          AI와 함께 마음속 이야기를 꺼내고<br />나만의 마음 숲을 만들어보세요
        </motion.p>
      </div>

      {/* 기능 카드 그리드 */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
          >
            <span className="text-2xl">{f.emoji}</span>
            <p className="text-sm font-extrabold text-slate-800 mt-2">{f.title}</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 고민 나누기 미리보기 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="px-4 mb-4"
      >
        <button
          onClick={() => navigate("/advice")}
          className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">고민 나누기 구경하기</p>
              <p className="text-xs text-slate-400">로그인 없이도 볼 수 있어요</p>
            </div>
          </div>
          <FiArrowRight className="text-slate-400" size={16} />
        </button>
      </motion.div>

      {/* 카카오 로그인 CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="px-4 space-y-2"
      >
        <a
          href={KAKAO_AUTH_URL}
          className="flex items-center justify-center gap-2 w-full py-4 bg-[#FEE500] rounded-2xl font-bold text-sm text-gray-900 shadow-sm"
        >
          <RiKakaoTalkFill size={20} />
          카카오로 시작하기
        </a>
        <p className="text-center text-xs text-slate-400">
          가입하면 마음의 숲, AI 조언, 리포트를 모두 사용할 수 있어요
        </p>
      </motion.div>
    </div>
  );
};

const Home = () => {
  const user = useUserStore((state) => state.user);
  const { userContents: forestData, loading } = useUserContents();
  const toastIdRef = useRef<string | null>(null);
  const lastToastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (forestData && forestData.length > 0) {
      const lastRecord = forestData[forestData.length - 1];
      if (lastRecord && lastRecord.level !== undefined) {
        const level = Number(lastRecord.level);
        const toastKey = `${lastRecord.id ?? lastRecord.date ?? forestData.length}-${level}`;
        if (lastToastKeyRef.current === toastKey) return;
        if (toastIdRef.current) toast.dismiss(toastIdRef.current);

        let id: string;
        if (level >= 6) {
          id = toast(<div className="flex flex-col gap-1"><span className="font-medium">기분 좋은 하루네요! 💫</span><span className="text-sm">오늘의 긍정적인 순간들을 기록해보세요</span></div>, { icon: "✨", duration: 5000 });
        } else if (level >= 3) {
          id = toast(<div className="flex flex-col gap-1"><span className="font-medium">평온한 하루를 보내고 계시네요 😊</span><span className="text-sm">잠시 명상을 하며 마음을 돌아보는 건 어떨까요?</span></div>, { icon: "🍃", duration: 5000 });
        } else {
          id = toast(<div className="flex flex-col gap-1"><span className="font-medium">힘든 시간을 보내고 계시네요 😔</span><span className="text-sm">고민을 글로 적어보면 마음이 한결 가벼워질 수 있어요</span></div>, { icon: "🌱", duration: 5000 });
        }
        toastIdRef.current = id;
        lastToastKeyRef.current = toastKey;
      }
    }
    return () => { if (toastIdRef.current) toast.dismiss(toastIdRef.current); };
  }, [forestData, user]);

  const getTodaysTip = () => {
    const today = new Date();
    const tipIndex = Number(`${today.getFullYear()}${today.getMonth()}${today.getDate()}`) % wellnessTips.length;
    return wellnessTips[tipIndex];
  };
  const [currentTip] = useState(getTodaysTip);

  const getAverageLevel = () => {
    if (!forestData || forestData.length === 0) return 0;
    const validItems = forestData.filter((item) => item.level !== undefined);
    if (validItems.length === 0) return 0;
    return (validItems.reduce((acc, item) => acc + Number(item.level), 0) / validItems.length).toFixed(2);
  };

  const getRecentMood = () => {
    if (!forestData || forestData.length === 0) return "아직 기록이 없습니다";
    const lastItem = forestData[forestData.length - 1];
    if (!lastItem || lastItem.level === undefined) return "아직 기록이 없습니다";
    const level = lastItem.level;
    if (level >= 6) return "마음이 따뜻해요";
    if (level >= 3) return "차분한 상태에요";
    return "힘이 들어요";
  };

  // 비로그인 → 랜딩 페이지
  if (!user) {
    return (
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <LandingPage />
      </div>
    );
  }

  return (
    <PageLayout requireAuth>
      <div className="flex flex-col pt-2 pb-4 space-y-4">
        <WorryPromptCarousel />
        <EmotionChart averageLevel={getAverageLevel()} loading={loading} chartData={forestData?.slice(-7) || []} />
        <div className="grid grid-cols-2 gap-4 px-4 mt-2">
          <StatCard icon={<FiCalendar />} title="나의 기록" value={`${forestData?.length || 0}회`} iconColor="text-green-600" iconBgColor="bg-green-50" />
          <StatCard icon={<FiHeart />} title="오늘의 기분" value={getRecentMood()} iconColor="text-rose-500" iconBgColor="bg-rose-50" />
        </div>
        <WellnessTipCard tip={currentTip} />
        <RecentRecords records={forestData?.slice(-3).reverse() || []} />
      </div>
      <AuthAlert />
    </PageLayout>
  );
};

export default Home;
