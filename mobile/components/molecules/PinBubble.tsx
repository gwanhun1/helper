import { StyleSheet, View } from "react-native";

import { colors, fontSize, fontWeight, radius, shadow } from "@/theme";

import { Text } from "../atoms/Text";

// ============================================================
// 공통 사이즈 계산
// ============================================================

export type PinSizes = {
  size: number;
  tail: number;
  tailOffset: number;
  totalH: number;
  envW: number;
  envH: number;
  envStroke: number;
  envTop: number;
  envLeft: number;
};

export const computePinSizes = (size: number): PinSizes => {
  const tail = Math.round(size * 0.28);
  const envW = Math.round(size * 0.5);
  const envH = Math.round(envW * 0.7);
  const envStroke = Math.max(2, Math.round(size * 0.045));
  return {
    size,
    tail,
    tailOffset: tail / 2,
    totalH: size + tail / 2,
    envW,
    envH,
    envStroke,
    envTop: Math.round((size - envH) / 2),
    envLeft: Math.round((size - envW) / 2),
  };
};

// ============================================================
// PinBody — 동그라미 + 꼬리 + ME/카운트 뱃지 (정지)
// ============================================================

type BodyProps = {
  replyCount?: number;
  isMine?: boolean;
  isHot?: boolean;
  size?: number;
};

export const PinBody = ({
  replyCount = 0,
  isMine,
  isHot,
  size = 52,
}: BodyProps) => {
  const s = computePinSizes(size);
  const fillColor = isMine ? colors.navy : colors.mintDeep;
  // 핫 핀: 본체 외곽 보더 색을 흰색 → gold로 변경 (subtle한 강조)
  const borderColor = isHot ? colors.gold : colors.surface;
  const borderWidth = isHot ? 3 : 2;

  return (
    <View style={[styles.wrap, { width: s.size, height: s.totalH }]}>
      {/* 꼬리 */}
      <View
        style={[
          styles.tail,
          {
            width: s.tail,
            height: s.tail,
            marginLeft: -s.tail / 2,
            bottom: s.tailOffset,
            backgroundColor: fillColor,
            // 꼬리도 gold 보더로 통일
            ...(isHot && {
              borderRightWidth: 0,
              borderBottomWidth: 0,
            }),
          },
        ]}
      />

      {/* 본체 동그라미 */}
      <View
        style={[
          styles.body,
          {
            width: s.size,
            height: s.size,
            backgroundColor: fillColor,
            borderColor,
            borderWidth,
          },
        ]}
      />

      {/* ME 뱃지 */}
      {isMine && (
        <View style={styles.meBadge}>
          <Text style={styles.meBadgeText}>ME</Text>
        </View>
      )}

      {/* 답장 카운트 뱃지 — 핫 핀이면 gold 색상으로 */}
      {replyCount > 0 && (
        <View
          style={[
            styles.countBadge,
            isHot && {
              backgroundColor: colors.gold,
            },
          ]}
        >
          <Text
            style={
              isHot
                ? [styles.countBadgeText, { color: "#5A3D00" }]
                : styles.countBadgeText
            }
          >
            {replyCount}
          </Text>
        </View>
      )}
    </View>
  );
};

// ============================================================
// PinIcon — 봉투 + V flap만 (이 layer만 animate 대상)
// ============================================================

type IconProps = {
  isMine?: boolean;
  /** body와 동일한 size로 받음 — 같은 좌표계에서 그려야 본체 center 정렬 */
  size?: number;
};

export const PinIcon = ({ isMine, size = 52 }: IconProps) => {
  const s = computePinSizes(size);
  const fillColor = isMine ? colors.navy : colors.mintDeep;

  // V flap: 두 corner에서 중앙으로 만나는 사선
  const halfW = s.envW / 2;
  const dy = s.envH * 0.5;
  const flapLen = Math.sqrt(halfW * halfW + dy * dy);
  const flapAngle = (Math.atan2(dy, halfW) * 180) / Math.PI;

  const leftMidX = s.envLeft + halfW / 2;
  const leftMidY = s.envTop + dy / 2;
  const rightMidX = s.envLeft + s.envW - halfW / 2;
  const rightMidY = s.envTop + dy / 2;

  return (
    <View style={[styles.wrap, { width: s.size, height: s.totalH }]}>
      {/* 봉투 본체 — 흰 사각형 */}
      <View
        style={{
          position: "absolute",
          top: s.envTop,
          left: s.envLeft,
          width: s.envW,
          height: s.envH,
          backgroundColor: colors.white,
          borderRadius: 2,
        }}
      />
      {/* V flap 왼쪽 사선 */}
      <View
        style={{
          position: "absolute",
          top: leftMidY - s.envStroke / 2,
          left: leftMidX - flapLen / 2,
          width: flapLen,
          height: s.envStroke,
          backgroundColor: fillColor,
          transform: [{ rotate: `${flapAngle}deg` }],
        }}
      />
      {/* V flap 오른쪽 사선 */}
      <View
        style={{
          position: "absolute",
          top: rightMidY - s.envStroke / 2,
          left: rightMidX - flapLen / 2,
          width: flapLen,
          height: s.envStroke,
          backgroundColor: fillColor,
          transform: [{ rotate: `${-flapAngle}deg` }],
        }}
      />
    </View>
  );
};

// ============================================================
// PinBubble — body + icon 합쳐서 사용 (placeholder/단독 사용용)
// ============================================================

type Props = {
  replyCount?: number;
  isMine?: boolean;
  isHot?: boolean;
  size?: number;
};

/**
 * 단일 컴포넌트로 사용 시 — body 위에 icon을 동일 layout으로 겹쳐 그림.
 * Naver 마커처럼 두 layer를 따로 다루고 싶으면 PinBody/PinIcon 직접 사용.
 */
export const PinBubble = ({
  replyCount = 0,
  isMine,
  isHot,
  size = 52,
}: Props) => {
  const s = computePinSizes(size);
  return (
    <View
      style={{
        width: s.size,
        height: s.totalH,
        position: "relative",
      }}
    >
      <View style={StyleSheet.absoluteFill}>
        <PinBody
          replyCount={replyCount}
          isMine={isMine}
          isHot={isHot}
          size={size}
        />
      </View>
      <View style={StyleSheet.absoluteFill}>
        <PinIcon isMine={isMine} size={size} />
      </View>
    </View>
  );
};

// ============================================================
// 스타일
// ============================================================

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    overflow: "visible",
  },
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.surface,
    ...shadow.card,
  },
  tail: {
    position: "absolute",
    left: "50%",
    transform: [{ rotate: "45deg" }],
  },
  meBadge: {
    position: "absolute",
    top: -4,
    left: -4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: radius.full,
    backgroundColor: colors.navy,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  meBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs - 3,
    fontWeight: fontWeight.black,
    letterSpacing: 0.4,
    lineHeight: fontSize.xs,
  },
  countBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: radius.full,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.surface,
  },
  countBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs - 2,
    fontWeight: fontWeight.black,
    lineHeight: fontSize.xs,
  },
});
