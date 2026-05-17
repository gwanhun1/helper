import { StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, radius, shadow } from "@/theme";

import { PressableScale } from "../atoms/PressableScale";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  size?: number;
};

/**
 * 지도 위 우측 컨트롤(내 위치, 레이어 등) 둥근 버튼.
 */
export const RoundIconButton = ({ icon, onPress, size = 42 }: Props) => {
  return (
    <PressableScale
      onPress={onPress}
      haptic="selection"
      style={[
        styles.btn,
        { width: size, height: size },
      ]}
    >
      <Feather name={icon} size={size * 0.4} color={colors.navy} />
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
});
