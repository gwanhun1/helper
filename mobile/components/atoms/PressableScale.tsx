import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type Props = Omit<PressableProps, "style"> & {
  /** 누름 스케일 정도 */
  scale?: number;
  /** 햅틱 강도 — "off"면 안 울림 */
  haptic?: "light" | "medium" | "selection" | "off";
  style?: StyleProp<ViewStyle>;
};

const TRIGGER_OPTIONS = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

export const PressableScale = ({
  scale = 0.96,
  haptic = "light",
  style,
  onPress,
  children,
  ...rest
}: Props) => {
  const handlePress = (
    e: Parameters<NonNullable<PressableProps["onPress"]>>[0],
  ) => {
    if (haptic !== "off") {
      switch (haptic) {
        case "light":
          ReactNativeHapticFeedback.trigger("impactLight", TRIGGER_OPTIONS);
          break;
        case "medium":
          ReactNativeHapticFeedback.trigger("impactMedium", TRIGGER_OPTIONS);
          break;
        case "selection":
          ReactNativeHapticFeedback.trigger("selection", TRIGGER_OPTIONS);
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
