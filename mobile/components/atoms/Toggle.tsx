import { StyleSheet, View } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { colors, radius } from "@/theme";

import { PressableScale } from "./PressableScale";

type Props = {
  value: boolean;
  onChange: (next: boolean) => void;
  size?: "sm" | "md";
};

/**
 * iOS-style 토글 스위치.
 * 켜짐: mint, 꺼짐: surfaceAlt.
 */
export const Toggle = ({ value, onChange, size = "md" }: Props) => {
  const W = size === "sm" ? 40 : 50;
  const H = size === "sm" ? 24 : 30;
  const knob = H - 4;

  const handlePress = () => {
    ReactNativeHapticFeedback.trigger("selection", {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    onChange(!value);
  };

  return (
    <PressableScale
      haptic="off"
      onPress={handlePress}
      style={[
        styles.track,
        {
          width: W,
          height: H,
          backgroundColor: value ? colors.mintDeep : colors.borderStrong,
        },
      ]}
    >
      <View
        style={[
          styles.knob,
          {
            width: knob,
            height: knob,
            transform: [{ translateX: value ? W - knob - 2 : 2 }],
          },
        ]}
      />
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: radius.full,
    justifyContent: "center",
  },
  knob: {
    position: "absolute",
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
});
