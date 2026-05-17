import { StyleSheet, View, ViewStyle } from "react-native";

import { colors, radius, shadow, spacing } from "@/theme";

type Variant = "surface" | "soft" | "navy";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  padding?: keyof typeof spacing;
  radiusKey?: keyof typeof radius;
  /** false면 그림자 없음 */
  shadowed?: boolean;
  bordered?: boolean;
  style?: ViewStyle;
};

export const Card = ({
  children,
  variant = "surface",
  padding = "lg",
  radiusKey = "xl",
  shadowed = true,
  bordered = true,
  style,
}: Props) => {
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variantBg(variant),
          padding: spacing[padding],
          borderRadius: radius[radiusKey],
          borderWidth: bordered && variant !== "navy" ? 1 : 0,
          borderColor: colors.border,
        },
        shadowed && shadow.subtle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const variantBg = (variant: Variant): string => {
  switch (variant) {
    case "surface":
      return colors.surface;
    case "soft":
      return colors.surfaceAlt;
    case "navy":
      return colors.navy;
  }
};

const styles = StyleSheet.create({
  base: { overflow: "hidden" },
});
