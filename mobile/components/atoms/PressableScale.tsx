import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";

type Props = Omit<PressableProps, "style"> & {
  /** 누름 스케일 정도 */
  scale?: number;
  /** 햅틱 강도 — "off"면 안 울림 */
  haptic?: "light" | "medium" | "selection" | "off";
  style?: StyleProp<ViewStyle>;
};

export const PressableScale = ({
  scale = 0.96,
  haptic = "light",
  style,
  onPress,
  children,
  ...rest
}: Props) => {
  const handlePress = (e: Parameters<NonNullable<PressableProps["onPress"]>>[0]) => {
    if (haptic !== "off") {
      switch (haptic) {
        case "light":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "selection":
          Haptics.selectionAsync();
          break;
      }
    }
    onPress?.(e);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        style,
        pressed && { transform: [{ scale }] },
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};
