import { StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  FAB,
  PeekSheet,
  RoundIconButton,
  Screen,
  TopChip,
  WorryMap,
} from "@/components";
import { SEED_WORRIES } from "@/data";
import { spacing } from "@/theme";

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const openWorry = (id: string) => {
    router.push(`/worry/${id}`);
  };

  return (
    <Screen safe={false} bg="surfaceAlt">
      {/* 풀스크린 지도 (Expo Go에선 placeholder, dev client에선 네이버 지도) */}
      <WorryMap worries={SEED_WORRIES} onPinPress={openWorry} />

      {/* 상단 플로팅 칩 */}
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

      {/* peek 시트 */}
      <PeekSheet
        title="이 근처에서 들려오는 마음"
        subtitle="위로 올려서 둘러보세요"
        onPress={() => {}}
        style={styles.peek}
      />

      {/* 작성 FAB */}
      <FAB
        icon="edit-3"
        label="내 마음 띄우기"
        onPress={() => {}}
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
  peek: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    bottom: 110,
    right: spacing.lg,
  },
});
