import { StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  FAB,
  NearbyWorrySheet,
  RoundIconButton,
  Screen,
  TopChip,
  WorryMap,
} from "@/components";
import { SEED_WORRIES } from "@/data";
import { spacing } from "@/theme";
import type { RootStackParamList } from "@/App";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openWorry = (id: string) => {
    navigation.navigate("Worry", { id });
  };

  return (
    <Screen safe={false} bg="surfaceAlt">
      {/* 풀스크린 지도 */}
      <WorryMap worries={SEED_WORRIES} onPinPress={openWorry} />

      {/* 상단 플로팅 칩 — 작게, 지도 가리지 않음 */}
      <SafeAreaView
        edges={["top"]}
        style={styles.topOverlay}
        pointerEvents="box-none"
      >
        <TopChip
          label="오늘의 마음"
          count={SEED_WORRIES.length}
          suffix="개가 떠있어요"
        />
      </SafeAreaView>

      {/* 우측 컨트롤 */}
      <View
        style={[styles.rightStack, { top: insets.top + 72 }]}
        pointerEvents="box-none"
      >
        <RoundIconButton icon="navigation" onPress={() => {}} />
        <RoundIconButton icon="layers" onPress={() => {}} />
      </View>

      {/* 드래그 가능한 풀 바텀시트 */}
      <NearbyWorrySheet worries={SEED_WORRIES} onPinPress={openWorry} />

      {/* 작성 FAB */}
      <FAB
        icon="edit-3"
        label="내 마음 띄우기"
        onPress={() => navigation.navigate("Compose")}
        style={styles.fab}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: spacing.sm,
  },
  rightStack: {
    position: "absolute",
    right: spacing.lg,
    gap: spacing.sm,
  },
  fab: {
    position: "absolute",
    bottom: 110,
    right: spacing.lg,
  },
});
