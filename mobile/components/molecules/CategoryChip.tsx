import { StyleSheet } from "react-native";

import { colors, fontSize, fontWeight, radius, spacing } from "@/theme";

import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

type Props = {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress?: () => void;
};

export const CategoryChip = ({ label, emoji, selected, onPress }: Props) => {
  return (
    <PressableScale
      onPress={onPress}
      haptic="selection"
      scale={0.97}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.mintDeep : colors.surface,
          borderColor: selected ? colors.mintDeep : colors.border,
        },
      ]}
    >
      {emoji && (
        <Text
          style={{
            fontSize: fontSize.lg,
            marginRight: spacing.sm,
          }}
        >
          {emoji}
        </Text>
      )}
      <Text
        style={{
          color: selected ? colors.white : colors.textPrimary,
          fontSize: fontSize.base,
          fontWeight: fontWeight.bold,
          letterSpacing: -0.2,
        }}
      >
        {label}
      </Text>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1.5,
  },
});
