import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, fontSize, fontWeight, spacing } from "@/theme";

import { Card } from "../atoms/Card";
import { Text } from "../atoms/Text";

type Props = {
  icon: string;
  value: string | number;
  label: string;
  accent?: "mint" | "navy" | "coral";
};

/**
 * 마이페이지 등에서 쓰는 작은 통계 카드.
 */
export const StatCard = ({ icon, value, label, accent = "navy" }: Props) => {
  const accentColor =
    accent === "mint"
      ? colors.mintDeep
      : accent === "coral"
        ? colors.coral
        : colors.navy;

  return (
    <Card padding="lg" style={styles.card}>
      <Feather name={icon} size={16} color={colors.mintDeep} />
      <Text
        style={{
          color: accentColor,
          fontSize: fontSize.xl,
          fontWeight: fontWeight.black,
          letterSpacing: -0.5,
          marginTop: 6,
        }}
      >
        {value}
      </Text>
      <Text variant="caption" tone="tertiary">
        {label}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: 2,
  },
});
