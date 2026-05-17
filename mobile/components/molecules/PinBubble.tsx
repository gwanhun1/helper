import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors, fontSize, fontWeight, radius, shadow } from "@/theme";

import { Text } from "../atoms/Text";

type Props = {
  /** 답장 수 — 0이면 뱃지 숨김 */
  replyCount?: number;
  /** 작성자 본인 글이면 navy 배경 + ME 뱃지 */
  isMine?: boolean;
  size?: number;
};

/**
 * 지도 위에 표시되는 위치 핀 — 동그란 본체 + 아래 꼬리(좌표 정확히 가리킴).
 * - 일반: mint 채운 배경 + 흰 아이콘
 * - 본인: navy 채운 배경 + 흰 아이콘 + 좌상단 ME 뱃지
 * - 답장 있음: 우상단 코랄 카운트 뱃지
 *
 * 전체 높이 = body + tail. 꼬리 끝이 좌표를 가리키도록 외부에서 anchor 처리.
 */
export const PinBubble = ({ replyCount = 0, isMine, size = 56 }: Props) => {
  const iconSize = Math.round(size * 0.55);
  const tail = Math.round(size * 0.28); // 회전 사각형 한 변
  const tailOffset = tail / 2; // 꼬리 절반은 body 안으로 들어감

  const fillColor = isMine ? colors.navy : colors.mintDeep;

  return (
    <View style={[styles.wrap, { width: size, height: size + tail / 2 }]}>
      {/* 꼬리 (회전된 사각형의 아래 절반만 보임) */}
      <View
        style={[
          styles.tail,
          {
            width: tail,
            height: tail,
            marginLeft: -tail / 2,
            bottom: tailOffset,
            backgroundColor: fillColor,
          },
        ]}
      />
      {/* 본체 */}
      <View
        style={[
          styles.body,
          {
            width: size,
            height: size,
            backgroundColor: fillColor,
          },
        ]}
      >
        <Feather name="mail" size={iconSize} color={colors.white} />
      </View>
      {/* ME 뱃지 */}
      {isMine && (
        <View style={styles.meBadge}>
          <Text style={styles.meBadgeText}>ME</Text>
        </View>
      )}
      {/* 답장 카운트 뱃지 */}
      {replyCount > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{replyCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
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
