import { StyleSheet, View } from "react-native";

import { colors, radius } from "@/theme";

type Props = {
  /** 좌측 % 위치 (0~1) */
  x: number;
  /** 상단 % 위치 (0~1) */
  y: number;
  size?: number;
  /** false면 비어있는(soft) 핀 — 멀리 있는 마음 표현 */
  filled?: boolean;
};

/**
 * 지도 위 마음 핀.
 * 실제 지도 SDK 연결 후엔 Marker 안에 이 컴포넌트만 그대로 사용.
 */
export const Pin = ({ x, y, size = 14, filled = true }: Props) => {
  return (
    <View
      style={[
        styles.base,
        {
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          width: size,
          height: size,
          backgroundColor: filled ? colors.mint : colors.mintSoft,
          borderColor: filled ? colors.mintDeep : colors.mint,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    position: "absolute",
    borderRadius: radius.full,
    borderWidth: 2,
  },
});
