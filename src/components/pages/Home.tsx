import PageLayout from "../organisms/PageLayout";
import AuthAlert from "../molecules/AuthAlert";
import useUserContents from "../../hooks/useUserContents";
import { FiCalendar, FiHeart } from "react-icons/fi";
import { toast } from "react-hot-toast";
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
import { useState, useEffect } from "react";
import StatCard from "../atoms/StatCard";
import EmotionChart from "../molecules/EmotionChart";
import WellnessTipCard from "../molecules/WellnessTipCard";
import RecentRecords from "../organisms/RecentRecords";
import WorryPromptCarousel from "../molecules/WorryPromptCarousel";

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
  const { userContents: forestData,loading } = useUserContents();

  useEffect(() => {
    if (forestData && forestData.length > 0) {
      const lastRecord = forestData[forestData.length - 1];
      if (lastRecord && lastRecord.level !== undefined) {
        const level = Number(lastRecord.level);

        if (level >= 6) {
          toast(
            <div className="flex flex-col gap-1">
              <span className="font-medium">기분 좋은 하루네요! 💫</span>
              <span className="text-sm">
                오늘의 긍정적인 순간들을 기록해보세요
              </span>
            </div>,
            { icon: "✨", duration: 5000 }
          );
          
        } else if (level >= 3) {
          toast(
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                평온한 하루를 보내고 계시네요 😊
              </span>
              <span className="text-sm">
                잠시 명상을 하며 마음을 돌아보는 건 어떨까요?
              </span>
            </div>,
            { icon: "🍃", duration: 5000 }
          );
        } else {
          toast(
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                힘든 시간을 보내고 계시네요 😔
              </span>
              <span className="text-sm">
                고민을 글로 적어보면 마음이 한결 가벼워질 수 있어요
              </span>
            </div>,
            { icon: "🌱", duration: 5000 }
          );
        }
      }
    }
  }, [forestData]);

  const getTodaysTip = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    const tipIndex = Number(dateString) % wellnessTips.length;
    return wellnessTips[tipIndex];
  };

  const [currentTip] = useState(getTodaysTip);

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
      ? "마음이 따뜻해요"
      : lastItem.level && lastItem.level < 6
      ? "차분한 상태에요"
      : "힘이 들어요";
  };

  const getRecentRecords = () => {
    if (!forestData) return [];
    return forestData.slice(-3).reverse();
  };

  const chartData = forestData?.slice(-7) || [];

  return (
    <PageLayout requireAuth>
      <div className="flex flex-col space-y-4  pb-4">
        <WorryPromptCarousel />
        <EmotionChart averageLevel={getAverageLevel()} loading={loading} chartData={chartData} />

        <div className="grid grid-cols-2 gap-4 px-4 mt-2">
          <StatCard
            icon={<FiCalendar />}
            title="나의 기록"
            value={`${forestData?.length || 0}회`}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatCard
            icon={<FiHeart />}
            title="오늘의 기분"
            value={getRecentMood()}
            iconColor="text-rose-500"
            iconBgColor="bg-rose-50"
          />
        </div>

        <WellnessTipCard tip={currentTip} />
        <RecentRecords records={getRecentRecords()} />
      </div>
      <AuthAlert />
    </PageLayout>
  );
};

export default Home;
