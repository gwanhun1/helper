import { ScrollView, StyleSheet } from "react-native";

import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";
import type { WorryCategory } from "@/data";

import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

export type CategoryFilterValue = WorryCategory | "전체";

const OPTIONS: { value: CategoryFilterValue; emoji?: string }[] = [
  { value: "전체" },
  { value: "관계", emoji: "💌" },
  { value: "일", emoji: "💼" },
  { value: "마음", emoji: "🌙" },
  { value: "일상", emoji: "🍃" },
];

type Props = {
  value: CategoryFilterValue;
  onChange: (next: CategoryFilterValue) => void;
};

/**
 * 지도 상단의 카테고리 필터 — 가로 스크롤 chip row.
 * 선택된 chip은 mint 채움 + 흰 텍스트.
 */
export const CategoryFilter = ({ value, onChange }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <PressableScale
            key={opt.value}
            haptic="selection"
            scale={0.95}
            onPress={() => onChange(opt.value)}
            style={[
              styles.chip,
              {
                backgroundColor: active
                  ? colors.mintDeep
                  : colors.surface,
                borderColor: active ? colors.mintDeep : colors.border,
              },
            ]}
          >
            {opt.emoji && (
              <Text
                style={{
                  fontSize: fontSize.sm,
                  marginRight: 4,
                }}
              >
                {opt.emoji}
              </Text>
            )}
            <Text
              style={{
                color: active ? colors.white : colors.textPrimary,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.bold,
                letterSpacing: -0.1,
              }}
            >
              {opt.value}
            </Text>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.full,
    borderWidth: 1.5,
    ...shadow.subtle,
  },
});
