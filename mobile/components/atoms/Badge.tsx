import { StyleSheet, View } from "react-native";

import { colors, fontSize, fontWeight, radius, spacing } from "@/theme";

import { Text } from "./Text";

type Variant = "mint" | "navy" | "coral" | "soft" | "gold";

type Props = {
  label: string;
  variant?: Variant;
};

export const Badge = ({ label, variant = "mint" }: Props) => {
  const { bg, fg } = variantColor(variant);
  return (
    <View style={[styles.base, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </View>
  );
};

const variantColor = (variant: Variant) => {
  switch (variant) {
    case "mint":
      return { bg: colors.mintSoft, fg: colors.mintInk };
    case "navy":
      return { bg: colors.navy, fg: colors.white };
    case "coral":
      return { bg: colors.coralSoft, fg: colors.coral };
    case "soft":
      return { bg: colors.surfaceAlt, fg: colors.textSecondary };
    case "gold":
      return { bg: colors.goldSoft, fg: "#8A6A1F" };
  }
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: fontSize.xs - 1,
    fontWeight: fontWeight.black,
    letterSpacing: 0.5,
  },
});
