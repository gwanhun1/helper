import { StyleSheet, ViewStyle } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";

import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

type Variant = "primary" | "navy";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label?: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
};

/**
 * Floating Action Button.
 * label이 있으면 extended FAB(아이콘+텍스트), 없으면 동그란 FAB.
 */
export const FAB = ({
  icon,
  label,
  onPress,
  variant = "primary",
  style,
}: Props) => {
  const bg = variant === "primary" ? colors.mintDeep : colors.navy;
  const extended = !!label;

  return (
    <PressableScale
      onPress={onPress}
      haptic="medium"
      style={[
        styles.base,
        {
          backgroundColor: bg,
          paddingHorizontal: extended ? spacing.xl : 0,
          paddingVertical: extended ? spacing.md + 2 : 0,
          width: extended ? undefined : 56,
          height: extended ? undefined : 56,
          borderRadius: extended ? radius.full : radius.full,
        },
        style,
      ]}
    >
      <Feather name={icon} size={extended ? 18 : 22} color={colors.white} />
      {extended && (
        <Text
          style={{
            color: colors.white,
            fontSize: fontSize.base,
            fontWeight: fontWeight.bold,
            letterSpacing: -0.2,
          }}
        >
          {label}
        </Text>
      )}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    ...shadow.lifted,
  },
});
