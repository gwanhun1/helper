import { useState, useEffect, useRef, CSSProperties } from "react";
import useUserContents from "../../hooks/useUserContents";
import { Item } from "../../hooks/useContentsData";
import useSelectTreeStore from "../../store/selectTreeStore";
import useUIStore from "../../store/uiStore";
import TreeIcon from "../atoms/TreeIcon";

const Forest = () => {
  const { userContents: forestData } = useUserContents();
  const { showWeatherEffect } = useUIStore();
  const [selectedTreeIndex, setSelectedTreeIndex] = useState<number | null>(
    null,
  );
  const [removingTreeIndex, setRemovingTreeIndex] = useState<number | null>(
    null,
  );
  const prevTreesRef = useRef<Item[]>([]);
  const treePositionsMap = useRef(new Map()).current;

  // 시간대별 테마 계산
  const getTimeTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return "dawn"; // 05:00 - 08:00
    if (hour >= 8 && hour < 17) return "day"; // 08:00 - 17:00
    if (hour >= 17 && hour < 20) return "evening"; // 17:00 - 20:00
    return "night"; // 20:00 - 05:00
  };

  type TimeTheme = "dawn" | "day" | "evening" | "night";
  type Season = "spring" | "summer" | "autumn" | "winter";

  // 현재 계절 계산
  const getCurrentSeason = (): Season => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  };

  const seasonalThemeStyles: Record<
    Season,
    Record<TimeTheme, { bg: string; overlay: string; text: string }>
  > = {
    spring: {
      dawn: {
        bg: "from-rose-50 via-pink-50 to-amber-50",
        overlay: "bg-rose-100/20",
        text: "text-rose-900",
      },
      day: {
        bg: "from-pink-50 via-rose-100 to-orange-50",
        overlay: "bg-white/20",
        text: "text-rose-900",
      },
      evening: {
        bg: "from-amber-100 via-rose-100 to-indigo-100",
        overlay: "bg-amber-200/15",
        text: "text-rose-900",
      },
      night: {
        bg: "from-slate-900 via-indigo-900 to-rose-900",
        overlay: "bg-black/25",
        text: "text-rose-100",
      },
    },
    summer: {
      dawn: {
        bg: "from-emerald-50 via-lime-50 to-sky-100",
        overlay: "bg-emerald-100/15",
        text: "text-emerald-900",
      },
      day: {
        bg: "from-emerald-100 via-teal-50 to-lime-100",
        overlay: "bg-white/10",
        text: "text-emerald-900",
      },
      evening: {
        bg: "from-lime-200 via-emerald-100 to-orange-100",
        overlay: "bg-emerald-200/15",
        text: "text-emerald-900",
      },
      night: {
        bg: "from-slate-900 via-emerald-900 to-slate-800",
        overlay: "bg-black/20",
        text: "text-emerald-100",
      },
    },
    autumn: {
      dawn: {
        bg: "from-amber-50 via-orange-50 to-rose-50",
        overlay: "bg-amber-100/20",
        text: "text-amber-900",
      },
      day: {
        bg: "from-amber-100 via-orange-100 to-rose-100",
        overlay: "bg-white/10",
        text: "text-amber-900",
      },
      evening: {
        bg: "from-amber-200 via-orange-200 to-rose-200",
        overlay: "bg-orange-300/15",
        text: "text-amber-900",
      },
      night: {
        bg: "from-slate-900 via-amber-900 to-rose-900",
        overlay: "bg-black/25",
        text: "text-amber-100",
      },
    },
    winter: {
      dawn: {
        bg: "from-blue-50 via-sky-50 to-cyan-50",
        overlay: "bg-white/15",
        text: "text-sky-900",
      },
      day: {
        bg: "from-sky-100 via-blue-50 to-cyan-100",
        overlay: "bg-white/10",
        text: "text-sky-900",
      },
      evening: {
        bg: "from-blue-200 via-sky-200 to-indigo-200",
        overlay: "bg-blue-200/15",
        text: "text-slate-900",
      },
      night: {
        bg: "from-slate-800 via-indigo-950 to-slate-900",
        overlay: "bg-black/20",
        text: "text-indigo-100",
      },
    },
  };

  const currentTheme = getTimeTheme();
  const currentSeason = getCurrentSeason();
  const theme = seasonalThemeStyles[currentSeason][currentTheme];

  // 나무의 고유 ID를 기반으로 랜덤한 수종(1, 2, 3) 결정 (새로고침해도 유지되게)
  const getTreeVariety = (treeId: string): 1 | 2 | 3 => {
    let hash = 0;
    for (let i = 0; i < treeId.length; i++) {
      hash = treeId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return ((Math.abs(hash) % 3) + 1) as 1 | 2 | 3;
  };

  const calculateTreeScale = (level: number = 3) => {
    const baseScale = level <= 2 ? 0.8 : level <= 4 ? 1.0 : 1.2;
    return baseScale + Math.random() * 0.2;
  };

  // 두 위치 사이의 거리를 계산하는 함수
  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  // 위치가 다른 나무들과 충분히 떨어져 있는지 확인
  const isPositionValid = (
    x: number,
    y: number,
    scale: number,
    existingPositions: Array<{ x: number; y: number; scale: number }>,
  ) => {
    const minDistance = 25; // 최소 거리 설정
    return existingPositions.every((pos) => {
      const requiredDistance = (minDistance * (scale + pos.scale)) / 2;
      const actualDistance = calculateDistance(x, y, pos.x, pos.y);
      return actualDistance > requiredDistance;
    });
  };

  // 나무 위치와 애니메이션 속성을 각 나무의 ID와 연결
  const getTreePosition = (treeId: string, level: number = 3) => {
    if (!treePositionsMap.has(treeId)) {
      const scale = calculateTreeScale(level);
      const horizontalMargin = 10 * scale;
      const verticalMargin = 20 * scale;

      // 기존 나무들의 위치 수집
      const existingPositions = Array.from(treePositionsMap.values()).map(
        (pos) => ({
          x: pos.xPos,
          y: pos.yPos,
          scale: pos.scale,
        }),
      );

      // 최대 시도 횟수 설정
      const maxAttempts = 50;
      let attempts = 0;
      let newX, newY;

      do {
        newX = Math.random() * (90 - horizontalMargin) + 5;
        newY = Math.random() * (100 - verticalMargin * 2) + verticalMargin;
        attempts++;
      } while (
        !isPositionValid(newX, newY, scale, existingPositions) &&
        attempts < maxAttempts
      );

      treePositionsMap.set(treeId, {
        xPos: newX,
        yPos: newY,
        scale: scale,
        rotateAngle: Math.random() * 6 - 3,
        waveDelay: Math.random() * 4,
        waveDuration: 3 + Math.random() * 3,
        swayAmount: Math.random() * 3 + 1,
      });
    }
    return treePositionsMap.get(treeId);
  };

  const handleTreeClick = (index: number, treeData: Item) => {
    setSelectedTreeIndex(selectedTreeIndex === index ? null : index);
    if (treeData) {
      useSelectTreeStore.getState().select(treeData);
    }
  };

  useEffect(() => {
    const prevTrees = prevTreesRef.current;
    if (prevTrees.length > forestData.length) {
      const removedIndex = prevTrees.findIndex(
        (prevTree) => !forestData.some((newTree) => newTree.id === prevTree.id),
      );

      if (removedIndex !== -1) {
        setRemovingTreeIndex(removedIndex);
        setTimeout(() => {
          setRemovingTreeIndex(null);
          setSelectedTreeIndex(null);
        }, 500);
      }
    }
    prevTreesRef.current = forestData;
  }, [forestData]);

  if (!forestData || !Array.isArray(forestData) || forestData.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-full bg-gradient-to-b ${theme.bg}`}
      >
        <div className="relative px-6 py-8 mx-auto w-full max-w-sm">
          <div className="relative space-y-6 text-center">
            <div
              className={`inline-flex justify-center items-center w-16 h-16 rounded-2xl shadow-inner backdrop-blur-sm bg-white/40`}
            >
              <span className="text-3xl">🌱</span>
            </div>

            <div className="space-y-2">
              <h3 className={`text-xl font-bold ${theme.text}`}>
                첫 번째 이야기를 들려주세요
              </h3>
              <p
                className={`text-sm ${theme.text} opacity-70 leading-relaxed font-medium`}
              >
                당신의 생각이 자라나 아름다운 나무가 될 거예요
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-colors duration-1000 
      bg-gradient-to-br ${theme.bg}
      shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]`}
    >
      {/* 테마별 오버레이 효과 */}
      <div
        className={`absolute inset-0 ${theme.overlay} pointer-events-none transition-colors duration-1000`}
      />

      {/* 별/반짝이 효과 (밤 테마일 때) */}
      {currentTheme === "night" && showWeatherEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 계절별 날씨 효과 */}
      {showWeatherEffect && (
        <div className="overflow-hidden absolute inset-0 pointer-events-none">
          {currentSeason === "winter" &&
            [...Array(80)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-10px",
                  width: `${Math.random() * (i % 3 === 0 ? 5 : 2) + 1}px`, // 다양한 크기 (큰 눈과 작은 눈)
                  height: `${Math.random() * (i % 3 === 0 ? 5 : 2) + 1}px`,
                  animation: `snow-fall ${
                    Math.random() * 4 + 3
                  }s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  filter: i % 5 === 0 ? "blur(1.5px)" : "blur(0.4px)", // 깊이감을 위한 블러 차이
                  opacity: 0,
                }}
              />
            ))}

          {currentSeason === "spring" &&
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-0"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#FFB7C5",
                  borderRadius: "50% 0 50% 50%",
                  animation: `petal-fall ${
                    Math.random() * 4 + 5
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            ))}

          {currentSeason === "autumn" &&
            [...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-0"
                style={{
                  left: `${Math.random() * 100}%`,
                  animation: `leaf-fall ${
                    Math.random() * 4 + 6
                  }s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-sm"
                  style={{
                    fill: i % 2 === 0 ? "#BF360C" : "#FFB300",
                  }}
                >
                  <path d="M12.5 3C9 6.2 7.2 8 5.2 12.2c-.9 1.9-.4 3.6 1.2 4.8 1.7 1.3 3.9 1.3 5.8.1l1-2.3 2.3-1c1.2-1.9 1.2-4.1-.1-5.8-1.2-1.6-2.9-2.1-4.8-1.2Z" />
                  <path
                    d="M7.5 14c2.7-.4 5-1.8 7-4"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 16.5c.5-1.6 1.5-3.1 3.2-4.8"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}

          {currentSeason === "summer" &&
            [...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animation: "pulse 3s infinite",
                  animationDelay: `${Math.random() * 5}s`,
                  filter: "blur(1px)",
                }}
              />
            ))}
        </div>
      )}

      {forestData.length > 0 &&
        forestData.map((tree, index) => {
          const position = getTreePosition(tree.id, tree.level);
          const isRemoving = removingTreeIndex === index;
          const variety = getTreeVariety(tree.id);

          return (
            <div
              key={tree.id}
              className={`absolute transition-all duration-500 ease-in-out group
              ${selectedTreeIndex === index ? "z-10" : ""}
              ${
                isRemoving ? "opacity-0 scale-0 rotate-90 translate-y-10" : ""
              }`}
              style={
                {
                  left: `${position.xPos}%`,
                  top: `${position.yPos}%`,
                  width: "52px",
                  height: "52px",
                  transform: `scale(${position.scale}) rotate(${position.rotateAngle}deg)`,
                  animation: `treeWave ${
                    position.waveDuration
                  }s infinite ease-in-out, 
                          treeSway ${
                            position.waveDuration * 1.5
                          }s infinite ease-in-out`,
                  animationDelay: `${position.waveDelay}s`,
                  "--sway-amount": `${position.swayAmount}deg`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                aria-label={`${index + 1}번째 마음 기록 보기`}
                aria-pressed={selectedTreeIndex === index}
                className={`w-full h-full transition-all duration-300 cursor-pointer drop-shadow-md
                ${
                  selectedTreeIndex === index
                    ? "scale-140 brightness-110"
                    : "hover:scale-115"
                }
              `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTreeClick(index, tree);
                }}
              >
                <TreeIcon
                  level={tree.level}
                  season={currentSeason}
                  variety={variety}
                  className="w-full h-full"
                />
              </button>
              {/* 선택된 나무 강조 효과 */}
              {selectedTreeIndex === index && (
                <div className="absolute -inset-2 rounded-full blur-md animate-pulse bg-white/20 -z-10" />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Forest;
