import { useState } from "react";
import ReactECharts from "echarts-for-react";
import useSelectTreeStore from "../../store/selectTreeStore";
import treeImage from "../../assets/tree.png";
import useLogData from "../../hooks/useLogData";

const Forest = () => {
  const { data: forestData } = useLogData();
  const [selectedTreeIndex, setSelectedTreeIndex] = useState(null);

  const getOption = () => ({
    color: ["#e54035"],
    xAxis: {
      type: "category",
      data: ["", "", "", "", "", "", "", "", "", ""],
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: ["1줄", "2줄", "3줄"],
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    grid: {
      left: "10%",
      right: "30%",
      top: "50%",
      bottom: "10%",
      width: 40,
    },
    series: [
      {
        name: "forest",
        type: "pictorialBar",
        symbol: "image://" + treeImage,
        symbolSize: [30, 55],
        data: forestData.map((tree, index) => ({
          value: Math.random() * 10,
          dataInfo: tree,
          itemStyle: {
            opacity: selectedTreeIndex === index ? 0.5 : 1, // 선택된 나무 강조
            borderColor:
              selectedTreeIndex === index ? "#ff0000" : "transparent", // 선택된 나무에 빨간 테두리
            borderWidth: selectedTreeIndex === index ? 2 : 0,
          },
          symbolPosition: [
            (index % 4) * 20 + "%",
            Math.floor(index / 3) * 33 + "%",
          ],
        })),
        animationEasing: "elasticOut",
      },
    ],
  });

  // 나무 클릭 시 데이터를 표시하는 함수
  const onChartClick = (params) => {
    const { dataIndex } = params;
    const { dataInfo } = params.data;

    // 같은 나무를 다시 클릭하면 선택 해제
    setSelectedTreeIndex(selectedTreeIndex === dataIndex ? null : dataIndex);

    if (dataInfo) {
      useSelectTreeStore.getState().select(dataInfo);
    }
  };

  return (
    <ReactECharts
      option={getOption()}
      onEvents={{
        click: onChartClick,
      }}
    />
  );
};

export default Forest;
