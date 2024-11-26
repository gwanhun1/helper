import ReactECharts from "echarts-for-react";

const treeDataURI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC";

const Forest = () => {
  console.log(forestData.length);

  const getOption = () => ({
    color: ["#e54035"],
    xAxis: {
      type: "category",
      data: ["", "", "", "", "", "", "", "", "", ""], // X축 데이터를 빈 값으로 채움
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: ["1줄", "2줄", "3줄"], // Y축 데이터 추가
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
      width: 1800 / 12,
    },
    series: [
      {
        name: "forest",
        type: "pictorialBar",
        symbol: "image://" + treeDataURI,
        symbolSize: [30, 55],
        data: forestData.map((tree, index) => ({
          value: Math.random() * 10, // 임의의 값 (나무의 크기)
          dataInfo: tree,
          itemStyle: {
            opacity: 1,
          },
          // 나무 위치를 세 줄로 나누기
          symbolPosition: [
            (index % 4) * 20 + "%", // X축 좌표
            Math.floor(index / 3) * 33 + "%", // Y축 좌표
          ],
        })),
        animationEasing: "elasticOut",
      },
    ],
  });

  // 나무 클릭 시 데이터를 표시하는 함수
  const onChartClick = (params: { data: { dataInfo: any } }) => {
    const { dataInfo } = params.data;
    if (dataInfo) {
      console.log("Clicked Tree Data:", dataInfo);
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

const forestData = [
  {
    content: "심심해",
    date: "11/7/2023",
    id: "-Nie6R64Dj9vGcOCoZQg",
    response:
      "그럴 때는 새로운 취미나 활동을 찾아보면 재미있게 시간을 보낼 수 있어요. 예를 들면, 책을 읽거나 영화를 보는 것도 좋은 방법이에요.",
    username: "본캐",
  },
  {
    content: "심심해 멍",
    date: "11/8/2023",
    id: "-Nie6k8GyLwbkm6bhnra",
    response: "따뜻하게! 너무 놀기 싫다면, 나랑 함께 놀아줄래?",
    username: "본캐",
  },
  {
    content: "오늘 뭐 할까?",
    date: "11/9/2023",
    id: "-Nie6R7DjX2vBcOCoZQa",
    response: "새로운 카페를 찾아보는 건 어때요? 색다른 경험이 될 거예요!",
    username: "별명A",
  },
  {
    content: "심심해... 뭐 재미있는 거 없어?",
    date: "11/10/2023",
    id: "-Nie7T8GyLwbKm6bhnrb",
    response: "퍼즐 게임을 해보는 건 어때요? 시간이 금방 갈 거예요!",
    username: "본캐",
  },
  {
    content: "게임이나 할까?",
    date: "11/11/2023",
    id: "-Nie8U9GyLwcNm6bhnrc",
    response:
      "좋은 생각이에요! 하지만 너무 오래 하지 말고 쉬는 것도 잊지 마세요.",
    username: "게임마스터",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "음악 추천 좀!",
    date: "11/12/2023",
    id: "-Nie9V3GyLwdCm6bhnrd",
    response: "최고의 음악을 추천해 줄게요! 언제든지 말해요.",
    username: "음악청취자",
  },
  {
    content: "나 오늘 시험 봐요",
    date: "11/13/2023",
    id: "-Nie1w5GyLweTm6bhnre",
    response: "시험 잘 볼 거예요! 긴장하지 말고 화이팅!",
    username: "본캐",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "도서관에 가고 싶어",
    date: "11/14/2023",
    id: "-Nie2X6GyLwfUm6bhnrf",
    response:
      "도서관에서 책을 읽으면 아주 즐거운 시간이 될 거예요! 같이 가고 싶네요.",
    username: "책벌레",
  },
  {
    content: "집에서 쉴 때 어떤 음악?",
    date: "11/15/2023",
    id: "-Nie3Y8GyLwgVm6bhnrg",
    response: "편안한 재즈나 클래식 음악이 좋겠네요. 리ラック스 해보세요.",
    username: "리듬왕",
  },
  {
    content: "운동 좀 하자",
    date: "11/16/2023",
    id: "-Nie4Z3GyLwhAm6bhnrh",
    response: "좋아요! 운동은 건강에도 좋고 기분 전환도 되죠.",
    username: "피트니스왕",
  },
  {
    content: "운동 좀 하자",
    date: "11/16/2023",
    id: "-Nie4Z3GyLwhAm6bhnrh",
    response: "좋아요! 운동은 건강에도 좋고 기분 전환도 되죠.",
    username: "피트니스왕",
  },
  {
    content: "운동 좀 하자",
    date: "11/16/2023",
    id: "-Nie4Z3GyLwhAm6bhnrh",
    response: "좋아요! 운동은 건강에도 좋고 기분 전환도 되죠.",
    username: "피트니스왕",
  },
  {
    content: "운동 좀 하자",
    date: "11/16/2023",
    id: "-Nie4Z3GyLwhAm6bhnrh",
    response: "좋아요! 운동은 건강에도 좋고 기분 전환도 되죠.",
    username: "피트니스왕",
  },
  {
    content: "운동 좀 하자",
    date: "11/16/2023",
    id: "-Nie4Z3GyLwhAm6bhnrh",
    response: "좋아요! 운동은 건강에도 좋고 기분 전환도 되죠.",
    username: "피트니스왕",
  },
];
