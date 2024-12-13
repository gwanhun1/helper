import { Line } from "react-chartjs-2";
import { formatDate } from "../../utils/date";
import { motion } from "framer-motion";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS } from "chart.js";
import "chart.js/auto";
import Loading from "../atoms/Loading";

ChartJS.register(ChartDataLabels);

interface EmotionChartProps {
  averageLevel: number | string;
  chartData: Array<{ date: string; level?: number }>;loading:boolean;
}

const EmotionChart = ({ averageLevel,loading, chartData }: EmotionChartProps) => {
  const getEmotionStyle = (level: number | string) => {
    const numLevel = typeof level === "string" ? parseFloat(level) : level;

    if (numLevel >= 6) {
      return {
        gradient: "from-rose-300 to-rose-200",
        borderColor: "border-rose-100",
        textColor: "text-rose-500",
        message: "마음이 많이 힘드시군요",
        subMessage: "잠시 휴식을 가지는 건 어떨까요?",
        messageColor: "text-rose-600",
        subMessageColor: "text-rose-400",
        chartColor: "rgb(244, 63, 94)",
        chartBgColor: "rgba(244, 63, 94, 0.2)",
      };
    } else if (numLevel >= 3) {
      return {
        gradient: "from-amber-300 to-amber-200",
        borderColor: "border-amber-100",
        textColor: "text-amber-500",
        message: "평온한 상태입니다",
        subMessage: "마음을 돌아보는 시간을 가져보세요",
        messageColor: "text-amber-600",
        subMessageColor: "text-amber-400",
        chartColor: "rgb(245, 158, 11)",
        chartBgColor: "rgba(245, 158, 11, 0.2)",
      };
    } else {
      return {
        gradient: "from-blue-300 to-blue-200",
        borderColor: "border-blue-100",
        textColor: "text-blue-500",
        message: "마음이 차분하고 안정적입니다",
        subMessage: "계속 잘 유지하세요!",
        messageColor: "text-blue-600",
        subMessageColor: "text-blue-400",
        chartColor: "rgb(59, 130, 246)",
        chartBgColor: "rgba(59, 130, 246, 0.2)",
      };
    }
  };

  const style = getEmotionStyle(averageLevel);

  const getEmotionEmoji = (level: number) => {
    if (level >= 4) return "😊";
    if (level >= 2) return "😐";
    return "😔";
  };

if(loading){
  return (
    <div className="bg-gradient-to-br from-[#F0F7EA] to-white flex flex-col items-center justify-center px-4 py-2 space-y-4 h-40">
      <Loading className="h-32" />
    </div>)
}

  if (!chartData || chartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#F0F7EA] to-white pt-6 pb-4 text-center shadow-md  border border-[#8BC34A]/30"
      >
        <div className="flex flex-col items-center justify-center px-4 py-2 space-y-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-[#8BC34A]/20">
            <span className="text-3xl">📝</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#2E7D32] font-ibm">
              아직 기록이 없어요
            </h3>
            <p className="font-ibm text-[15px] text-[#666666] leading-relaxed">
              첫 번째 이야기를 들려주시면<br />
              멋진 그래프를 그려드릴게요 ✨
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${style.gradient} pt-6 pb-2 text-center shadow-md hover:shadow-lg transition-shadow  ${style.borderColor}`}
    >
      <div className="flex justify-center items-center">
        <div className={`font-ibm font-medium ${style.messageColor}`}>
          {style.message} |
        </div>
        <p className={`font-ibm font-bold ${style.messageColor} ml-2`}>{averageLevel}</p>
      </div>
      <div className={` text-sm font-medium ${style.subMessageColor}`}>
        {style.subMessage}
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="h-32 w-60">
          <Line
            data={{
              labels: chartData.map((item) => formatDate(item.date)),
              datasets: [
                {
                  label: "감정 레벨",
                  data: chartData.map((item) => item.level),
                  borderColor: style.chartColor,
                  backgroundColor: "white",
                  tension: 0.4,
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  top: 32,
                  left: 20,
                  right: 20,
                },
              },
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
                tooltip: {
                  enabled: false,
                },
                datalabels: {
                  backgroundColor: "white",
                  borderRadius: 4,
                  borderWidth: 1.5,
                  padding: {
                    top: 3,
                    bottom: 2,
                    left: 3.5,
                    right: 0,
                  },
                  anchor: "end",
                  align: "top",
                  offset: 3,
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                  formatter: (value) => getEmotionEmoji(value as number),
                },
              },
              elements: {
                line: {
                  borderWidth: 1.5,
                },
                point: {
                  radius: 2.5,
                  backgroundColor: style.chartColor,
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
  );
};

export default EmotionChart;
