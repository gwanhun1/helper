import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors, radius } from "@/theme";

type Size = "sm" | "md" | "lg";
type Variant = "mint" | "navy" | "soft";

type Props = {
  icon?: keyof typeof Feather.glyphMap;
  size?: Size;
  variant?: Variant;
};

const sizeMap = { sm: 32, md: 44, lg: 56 } as const;
const iconSizeMap = { sm: 16, md: 20, lg: 26 } as const;

export const Avatar = ({ icon = "moon", size = "lg", variant = "mint" }: Props) => {
  const { bg, fg } = variantColor(variant);
  const dim = sizeMap[size];

  return (
    <View
      style={[
        styles.base,
        { width: dim, height: dim, backgroundColor: bg },
      ]}
    >
      <Feather name={icon} size={iconSizeMap[size]} color={fg} />
    </View>
  );
};

const variantColor = (variant: Variant) => {
  switch (variant) {
    case "mint":
      return { bg: colors.mintSoft, fg: colors.mintDeep };
    case "navy":
      return { bg: colors.navy, fg: colors.white };
    case "soft":
      return { bg: colors.surfaceAlt, fg: colors.textSecondary };
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
