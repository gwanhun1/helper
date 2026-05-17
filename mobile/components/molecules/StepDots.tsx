import { StyleSheet, View } from "react-native";

import { colors, radius, spacing } from "@/theme";

type Props = {
  total: number;
  current: number; // 1-indexed
};

/**
 * 작성 모달 등에서 사용하는 단계 인디케이터.
 * 활성 dot은 mint + 길쭉하고, 비활성은 작은 회색 dot.
 */
export const StepDots = ({ total, current }: Props) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isPast = step < current;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: isActive ? 22 : 6,
                backgroundColor: isActive || isPast ? colors.mintDeep : colors.border,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  dot: {
    height: 6,
    borderRadius: radius.full,
  },
});
