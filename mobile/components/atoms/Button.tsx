import { StyleSheet, View, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";

import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

type Variant = "primary" | "ghost" | "outline" | "navy";
type Size = "sm" | "md" | "lg";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Feather.glyphMap;
  fullWidth?: boolean;
  style?: ViewStyle;
};

const sizePadding = {
  sm: { v: spacing.sm, h: spacing.md },
  md: { v: spacing.md, h: spacing.lg },
  lg: { v: spacing.md + 4, h: spacing.xl },
};

const sizeFont = { sm: fontSize.sm, md: fontSize.base, lg: fontSize.base };
const iconSize = { sm: 14, md: 16, lg: 18 };

export const Button = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  style,
}: Props) => {
  const { bg, fg, border } = variantStyle(variant);
  const pad = sizePadding[size];

  return (
    <PressableScale
      onPress={onPress}
      style={[
        styles.base,
        {
          paddingVertical: pad.v,
          paddingHorizontal: pad.h,
          backgroundColor: bg,
          borderColor: border,
          borderWidth: border ? 1 : 0,
        },
        fullWidth && { alignSelf: "stretch" },
        variant === "primary" && shadow.card,
        style,
      ]}
    >
      <View style={styles.inner}>
        {icon && <Feather name={icon} size={iconSize[size]} color={fg} />}
        <Text
          style={{
            color: fg,
            fontSize: sizeFont[size],
            fontWeight: fontWeight.bold,
            letterSpacing: -0.2,
          }}
        >
          {label}
        </Text>
      </View>
    </PressableScale>
  );
};

const variantStyle = (variant: Variant) => {
  switch (variant) {
    case "primary":
      return { bg: colors.mintDeep, fg: colors.white, border: undefined };
    case "navy":
      return { bg: colors.navy, fg: colors.white, border: undefined };
    case "ghost":
      return { bg: "transparent", fg: colors.mintDeep, border: undefined };
    case "outline":
      return { bg: colors.surface, fg: colors.textPrimary, border: colors.border };
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
