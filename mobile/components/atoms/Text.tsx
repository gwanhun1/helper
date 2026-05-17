import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";

import { colors, fontSize, fontWeight } from "@/theme";

type Variant =
  | "display"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "eyebrow";
type Tone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "navy"
  | "mint"
  | "mintDeep"
  | "coral"
  | "white";

type Props = RNTextProps & {
  variant?: Variant;
  tone?: Tone;
  weight?: keyof typeof fontWeight;
  style?: TextStyle | TextStyle[];
};

export const Text = ({
  variant = "body",
  tone = "primary",
  weight,
  style,
  children,
  ...rest
}: Props) => {
  return (
    <RNText
      style={[
        styles[variant],
        { color: toneColor(tone) },
        weight && { fontWeight: fontWeight[weight] },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const toneColor = (tone: Tone): string => {
  switch (tone) {
    case "primary":
      return colors.textPrimary;
    case "secondary":
      return colors.textSecondary;
    case "tertiary":
      return colors.textTertiary;
    case "navy":
      return colors.navy;
    case "mint":
      return colors.mint;
    case "mintDeep":
      return colors.mintDeep;
    case "coral":
      return colors.coral;
    case "white":
      return colors.white;
  }
};

const styles = StyleSheet.create({
  display: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.black,
    letterSpacing: -0.8,
    lineHeight: fontSize["3xl"] * 1.15,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.5,
    lineHeight: fontSize.xl * 1.25,
  },
  subtitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.3,
    lineHeight: fontSize.md * 1.4,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.base * 1.5,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.xs * 1.5,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.black,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
