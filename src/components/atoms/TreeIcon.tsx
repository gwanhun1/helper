import React from "react";

interface TreeIconProps {
  level?: number;
  season?: "spring" | "summer" | "autumn" | "winter";
  variety?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
}

const TreeIcon = ({ level = 3, season = "spring", variety = 1, className, style }: TreeIconProps) => {
  const renderTree = () => {
    // 공통 새싹 단계 (Level 1) - 계절별 색상
    if (level <= 1) {
      const sproutColors = {
        spring: { left: "#FFB7C5", right: "#F8BBD0" }, // 연분홍
        summer: { left: "#AED581", right: "#8BC34A" }, // 연두색
        autumn: { left: "#FFCC80", right: "#FFB74D" }, // 주황빛
        winter: { left: "#E1F5FE", right: "#B3E5FC" }  // 하얀/연한 파란색
      };
      const colors = sproutColors[season];
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          <path d="M50 95 L50 75" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
          <path d="M50 75 C40 65 35 75 42 82 C45 85 50 80 50 75" fill={colors.left} />
          <path d="M50 75 C60 65 65 75 58 82 C55 85 50 80 50 75" fill={colors.right} />
        </svg>
      );
    }

    // 계절별 + 랜덤 종류별 분기 (Premium Illustrative Style)
    const variants: Record<string, Record<number, JSX.Element>> = {
      spring: {
        1: ( // 수채화빛 휘날리는 벚꽃나무
          <g>
            <defs>
              <linearGradient id="spring1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="100%" stopColor="#F8BBD0" />
              </linearGradient>
            </defs>
            <path d="M50 95 Q52 85 50 75" stroke="#4E342E" strokeWidth="6" strokeLinecap="round" />
            <path d="M25 65 Q35 45 50 50 Q65 45 75 65 Q60 75 50 72 Q35 75 25 65 Z" fill="url(#spring1Grad)" />
            <path d="M32 50 Q45 35 55 42 Q65 35 72 50 Q60 58 50 55 Q40 58 32 50 Z" fill="#FCE4EC" />
            <path d="M40 35 Q48 25 52 28 Q58 25 62 38 Q50 45 40 35 Z" fill="#FFFFFF" opacity="0.8" />
            {/* 꽃잎 맺힘 디테일 */}
            <circle cx="45" cy="62" r="1.5" fill="#F06292" opacity="0.6" />
            <circle cx="58" cy="48" r="1.2" fill="#F48FB1" opacity="0.8" />
          </g>
        ),
        2: ( // 소복하게 피어난 진달래 숲
          <g>
            <defs>
              <radialGradient id="spring2Grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FCE4EC" />
                <stop offset="100%" stopColor="#F06292" />
              </radialGradient>
            </defs>
            <path d="M50 95 L50 78" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
            <path d="M22 68 Q35 48 50 52 Q65 48 78 68 Q65 78 50 75 Q35 78 22 68 Z" fill="url(#spring2Grad)" />
            <path d="M35 52 Q45 38 55 42 Q65 38 70 52 Q55 60 45 58 Q35 60 35 52 Z" fill="#F48FB1" opacity="0.7" />
            <circle cx="48" cy="55" r="5" fill="#FFFFFF" opacity="0.2" />
          </g>
        ),
        3: ( // 우아하게 늘어진 목련 구름
          <g>
            <path d="M50 95 Q52 85 50 70" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
            <path d="M25 65 Q40 40 55 45 Q70 40 75 60 Q65 75 50 70 Q35 75 25 65 Z" fill="#FFFFFF" />
            <path d="M35 50 Q48 35 55 40 Q62 35 68 50 Q55 58 48 55 Z" fill="#E1F5FE" opacity="0.4" />
            <path d="M45 40 Q50 32 55 40 Z" fill="#F3E5F5" opacity="0.6" />
          </g>
        )
      },
      summer: {
        1: ( // 울창한 숲의 왕 떡갈나무
          <g>
            <defs>
              <linearGradient id="summer1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#43A047" />
                <stop offset="100%" stopColor="#1B5E20" />
              </linearGradient>
            </defs>
            <path d="M50 95 L50 75" stroke="#3E2723" strokeWidth="8" strokeLinecap="round" />
            <path d="M18 70 Q35 50 50 55 Q65 50 82 70 Q65 82 50 78 Q35 82 18 70 Z" fill="url(#summer1Grad)" />
            <path d="M28 55 Q42 38 52 42 Q62 38 72 55 Q60 62 50 58 Q40 62 28 55 Z" fill="#2E7D32" opacity="0.8" />
            <path d="M40 42 Q48 30 52 32 Q58 30 62 42 Q50 48 40 42 Z" fill="#66BB6A" opacity="0.5" />
          </g>
        ),
        2: ( // 싱그러운 에메랄드 메이플
          <g>
            <defs>
              <linearGradient id="summer2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9CCC65" />
                <stop offset="100%" stopColor="#388E3C" />
              </linearGradient>
            </defs>
            <path d="M50 95 L50 70" stroke="#5D4037" strokeWidth="7" strokeLinecap="round" />
            <path d="M20 65 Q35 45 50 50 Q65 45 80 65 Q65 75 50 72 Q35 75 20 65 Z" fill="url(#summer2Grad)" />
            <path d="M35 50 Q48 35 55 40 Q62 35 68 50 Q55 58 48 55 Z" fill="#8BC34A" opacity="0.6" />
            <path d="M42 40 Q50 32 58 40" fill="none" stroke="#DCEDC8" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          </g>
        ),
        3: ( // 깊은 산속 신비한 덩굴나무
          <g>
            <path d="M50 95 L50 70" stroke="#4a3728" strokeWidth="8" strokeLinecap="round" />
            <path d="M15 68 Q30 52 45 58 Q55 52 65 58 Q80 52 85 70 Q65 82 45 80 Q25 82 15 68 Z" fill="#1B5E20" />
            <path d="M30 55 Q42 42 50 45 Q58 42 70 55 Q55 62 45 60 Q38 62 30 55 Z" fill="#2E7D32" opacity="0.7" />
            <circle cx="45" cy="52" r="12" fill="#4CAF50" opacity="0.3" />
          </g>
        )
      },
      autumn: {
        1: ( // 노을 무드 불타는 단풍나무
          <g>
            <defs>
              <linearGradient id="autumn1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF7043" />
                <stop offset="100%" stopColor="#BF360C" />
              </linearGradient>
            </defs>
            <path d="M50 95 L50 75" stroke="#3E2723" strokeWidth="7" strokeLinecap="round" />
            <path d="M20 72 Q35 55 50 60 Q65 55 80 72 Q65 82 50 80 Q35 82 20 72 Z" fill="url(#autumn1Grad)" />
            <path d="M30 58 Q42 42 52 45 Q62 42 70 58 Q60 65 50 62 Q40 65 30 58 Z" fill="#D84315" opacity="0.8" />
            <path d="M40 45 Q48 32 52 35 Q58 32 62 45" fill="none" stroke="#FFAB91" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          </g>
        ),
        2: ( // 황금빛으로 물든 풍성한 은행나무
          <g>
            <defs>
              <radialGradient id="autumn2Grad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFEE58" />
                <stop offset="100%" stopColor="#F9A825" />
              </radialGradient>
            </defs>
            <path d="M50 95 L50 72" stroke="#4E342E" strokeWidth="7" strokeLinecap="round" />
            <path d="M22 65 Q38 42 55 48 Q72 42 78 65 Q65 75 52 70 Q32 75 22 65 Z" fill="url(#autumn2Grad)" />
            <path d="M38 50 Q48 35 58 40 Q68 35 72 50 Q60 58 50 55 Q42 58 38 50 Z" fill="#FBC02D" opacity="0.7" />
            <path d="M45 42 Q52 35 60 42" fill="none" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          </g>
        ),
        3: ( // 깊어가는 가을 감나무 무드
          <g>
            <path d="M50 95 L50 75" stroke="#4E342E" strokeWidth="7" strokeLinecap="round" />
            <path d="M25 70 Q40 52 52 58 Q62 52 75 70 Q60 80 50 78 Q35 80 25 70 Z" fill="#E65100" />
            <path d="M35 58 Q45 42 52 45 Q62 42 68 58 Q55 65 50 62 Z" fill="#F57C00" opacity="0.7" />
            {level >= 4 && (
              <>
                <circle cx="55" cy="50" r="3.5" fill="#FF3D00" className="animate-pulse" />
                <circle cx="42" cy="65" r="3" fill="#FF3D00" opacity="0.8" />
              </>
            )}
          </g>
        )
      },
      winter: {
        1: ( // 눈이 무겁게 쌓인 노르웨이 숲 스타일
          <g>
            <defs>
              <linearGradient id="winter1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F0F9FF" />
                <stop offset="100%" stopColor="#E0F7FA" />
              </linearGradient>
            </defs>
            <path d="M50 95 Q52 85 50 80" stroke="#3E2723" strokeWidth="5" strokeLinecap="round" />
            {/* 눈 덩어리 레이어들 - 뾰족함을 뺀 몽글몽글한 비정형 shape */}
            <path d="M20 75 Q35 65 50 68 Q65 65 80 75 Q65 82 50 80 Q35 82 20 75 Z" fill="url(#winter1Grad)" />
            <path d="M28 62 Q40 50 50 53 Q60 50 72 62 Q60 68 50 65 Q40 68 28 62 Z" fill="#FFFFFF" />
            <path d="M35 50 Q45 38 50 40 Q55 38 65 50 Q55 55 50 52 Q45 55 35 50 Z" fill="#F8F9FA" />
            <path d="M42 38 Q48 28 50 30 Q52 28 58 38 Q50 42 42 38 Z" fill="#FFFFFF" />
            {/* 미세하게 보이는 잎 하단부 */}
            <circle cx="40" cy="78" r="3" fill="#1B4332" opacity="0.3" />
            <circle cx="60" cy="78" r="3" fill="#1B4332" opacity="0.3" />
          </g>
        ),
        2: ( // 함박눈을 맞은 둥근 침엽수
          <g>
            <defs>
              <radialGradient id="winter2Grad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E1F5FE" />
              </radialGradient>
            </defs>
            <path d="M50 95 L50 80" stroke="#3E2723" strokeWidth="6" strokeLinecap="round" />
            {/* 거대한 설산 같은 실루엣 */}
            <path d="M15 75 Q30 55 50 58 Q70 55 85 75 Q70 85 50 82 Q30 85 15 75 Z" fill="url(#winter2Grad)" />
            <path d="M25 58 Q40 40 50 43 Q60 40 75 58 Q60 65 50 62 Q40 65 25 58 Z" fill="#FFFFFF" />
            <path d="M38 42 Q48 28 50 30 Q52 28 62 42 Q50 48 38 42 Z" fill="#F8F9FA" />
            {/* 반짝이는 얼음 결정 */}
            <circle cx="50" cy="18" r="4" fill="#FFE082" className="animate-pulse" />
            <circle cx="45" cy="55" r="1.5" fill="#FFFFFF" opacity="0.8" />
          </g>
        ),
        3: ( // 투명한 얼음 코팅된 하얀 나무
          <g>
            <path d="M50 95 Q52 80 50 72" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
            {/* 뭉게구름 같은 눈더미 */}
            <path d="M20 70 Q30 55 45 60 Q55 55 65 60 Q80 55 75 75 Q60 85 40 85 Q25 80 20 70 Z" fill="#FFFFFF" />
            <path d="M32 55 Q42 40 50 45 Q58 40 68 55 Q55 62 45 62 Q38 60 32 55 Z" fill="#EBF8FF" opacity="0.8" />
            <circle cx="48" cy="35" r="12" fill="#FFFFFF" />
            {/* 얼음 보석 포인트 */}
            <circle cx="45" cy="45" r="2" fill="#E0F7FA" className="animate-pulse" />
            <circle cx="58" cy="40" r="1.5" fill="#B2EBF2" />
            <circle cx="38" cy="58" r="1.2" fill="#B2EBF2" />
          </g>
        )
      }
    };

    return (
      <svg viewBox="0 0 100 100" className={className} style={style}>
        {variants[season][variety]}
      </svg>
    );
  };

  return renderTree();
};

export default TreeIcon;
