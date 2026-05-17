import { StyleSheet, View } from "react-native";

import { spacing } from "@/theme";

import { Text } from "../atoms/Text";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

/**
 * 화면 상단 헤더 — 작은 eyebrow + 큰 타이틀 + 옵션 서브.
 * 마이/받은답장 등에 일관적으로 사용.
 */
export const SectionHeader = ({ eyebrow, title, subtitle }: Props) => {
  return (
    <View style={styles.wrap}>
      {eyebrow && (
        <Text variant="eyebrow" tone="mintDeep">
          {eyebrow}
        </Text>
      )}
      <Text variant="title" tone="navy">
        {title}
      </Text>
      {subtitle && (
        <Text variant="caption" tone="secondary" style={{ marginTop: 4 }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: 6,
  },
});
