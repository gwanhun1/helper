import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";

import { Text } from "../atoms/Text";

type Props = {
  /** 지난 7일간 보낸 답장 수 */
  weeklyCount: number;
  /** 이 지역(동) 상위 % */
  rankPercent: number;
  /** 지역명 */
  region?: string;
};

/**
 * 마이 탭 — "이 지역 답변왕" 개인 통계 카드.
 * 익명성 유지: 본인에게만 표시. 다른 사람은 누가 답변왕인지 모름.
 */
export const AnswerKingCard = ({
  weeklyCount,
  rankPercent,
  region = "이 동네",
}: Props) => {
  const isTop = rankPercent <= 10;
  return (
    <View style={styles.card}>
      {/* 배경 데코 — 빛나는 별 */}
      <View style={[styles.starDeco, styles.star1]} />
      <View style={[styles.starDeco, styles.star2]} />
      <View style={[styles.starDeco, styles.star3]} />

      <View style={styles.head}>
        <View style={styles.crown}>
          <Feather name="award" size={18} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="eyebrow" tone="white" style={{ opacity: 0.7 }}>
            {region} 답변왕
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: fontSize.lg,
              fontWeight: fontWeight.black,
              letterSpacing: -0.3,
              marginTop: 2,
            }}
          >
            {isTop ? "상위 답변왕이에요" : "마음을 잘 건네는 분"}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Text
            style={{
              color: colors.white,
              fontSize: fontSize["2xl"],
              fontWeight: fontWeight.black,
              letterSpacing: -1,
            }}
          >
            {weeklyCount}
          </Text>
          <Text
            variant="caption"
            style={{ color: colors.white, opacity: 0.7, marginTop: 2 }}
          >
            지난 7일 답장
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBlock}>
          <Text
            style={{
              color: colors.white,
              fontSize: fontSize["2xl"],
              fontWeight: fontWeight.black,
              letterSpacing: -1,
            }}
          >
            상위 {rankPercent}%
          </Text>
          <Text
            variant="caption"
            style={{ color: colors.white, opacity: 0.7, marginTop: 2 }}
          >
            {region} 답변자 중
          </Text>
        </View>
      </View>

      <Text
        variant="caption"
        style={{
          color: colors.white,
          opacity: 0.7,
          marginTop: spacing.md,
          lineHeight: 18,
        }}
      >
        익명이라 다른 사람은 몰라요. 당신의 따뜻함이 이 동네를 채우고 있어요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.navy,
    borderRadius: radius["2xl"],
    padding: spacing.xl,
    overflow: "hidden",
    ...shadow.card,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  crown: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.mintDeep,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  statBlock: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: colors.white,
    opacity: 0.15,
  },

  // 배경 별빛 데코
  starDeco: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gold,
    opacity: 0.6,
  },
  star1: {
    top: 14,
    right: 24,
    width: 6,
    height: 6,
  },
  star2: {
    top: 40,
    right: 80,
  },
  star3: {
    top: 28,
    right: 50,
    backgroundColor: colors.mint,
    opacity: 0.5,
  },
});
