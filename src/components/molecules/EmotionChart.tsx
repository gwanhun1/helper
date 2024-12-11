import { Line } from "react-chartjs-2";
import { formatDate } from "../../utils/date";
import { motion } from "framer-motion";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';

ChartJS.register(ChartDataLabels);

interface EmotionChartProps {
  averageLevel: number | string;
  chartData: Array<{ date: string; level?: number }>;
}

const EmotionChart = ({ averageLevel, chartData }: EmotionChartProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${style.gradient} rounded-xl pt-6 pb-2 text-center shadow-md hover:shadow-lg transition-shadow border ${style.borderColor}`}
    >
      <div className={`font-medium ${style.messageColor}`}>
        {style.message} | {averageLevel}
      </div>
      <div className={`text-sm font-medium ${style.subMessageColor}`}>
        {style.subMessage}
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="h-20 w-48">
          <Line
            data={{
              labels: chartData.map((item) => formatDate(item.date)),
              datasets: [
                {
                  label: "감정 레벨",
                  data: chartData.map((item) => item.level),
                  borderColor: style.chartColor,
                  backgroundColor: 'white',
                  tension: 0.4,
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
                  color: 'white',
                  backgroundColor: style.chartColor,
                  borderRadius: 4,
                  padding: { top: 4, bottom: 4, left: 6, right: 6 },
                  anchor: 'end',
                  align: 'top',
                  offset: 0,
                  font: {
                    size: 10,
                    weight: 'bold'
                  },
                  formatter: (value) => value
                }
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
