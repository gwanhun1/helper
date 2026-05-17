import { StyleSheet, View } from "react-native";

import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";

import { Text } from "../atoms/Text";

type Props = {
  label: string;
  /** 강조될 카운트(네이비) — 옵션 */
  count?: number;
  suffix?: string;
};

/**
 * 지도 풀스크린 위 상단 플로팅 알약.
 * 네이버맵의 검색바 위치를 대체.
 */
export const TopChip = ({ label, count, suffix }: Props) => {
  return (
    <View style={styles.chip}>
      <View style={styles.dot} />
      <Text variant="body" tone="secondary" weight="semibold">
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={{
            color: colors.navy,
            fontSize: fontSize.md,
            fontWeight: fontWeight.black,
            letterSpacing: -0.3,
          }}
        >
          {count}
        </Text>
      )}
      {suffix && (
        <Text variant="body" tone="tertiary" weight="medium">
          {suffix}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - 2,
    borderRadius: radius.full,
    ...shadow.card,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.mint,
    marginRight: 2,
  },
});
