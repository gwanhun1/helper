import { StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

type Props = {
  children: React.ReactNode;
  edges?: Edge[];
  /** false면 SafeAreaView 미적용 (지도처럼 풀스크린 화면용) */
  safe?: boolean;
  /** 배경색 — 기본 bg(웜 화이트). 지도 화면은 'surfaceAlt' 권장 */
  bg?: keyof typeof colors;
  style?: ViewStyle;
};

export const Screen = ({
  children,
  edges = ["top"],
  safe = true,
  bg = "bg",
  style,
}: Props) => {
  const containerStyle = [
    styles.base,
    { backgroundColor: colors[bg] as string },
    style,
  ];

  if (!safe) {
    return <View style={containerStyle}>{children}</View>;
  }

  return (
    <SafeAreaView style={containerStyle} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: { flex: 1 },
});
