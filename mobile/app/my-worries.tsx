import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  EmptyState,
  PressableScale,
  Text,
  WorryCard,
} from "@/components";
import type { RootStackParamList } from "@/App";
import { SEED_WORRIES } from "@/data";
import { colors, spacing } from "@/theme";

/**
 * 내가 띄운 마음 모음 — 본인이 작성한 worries 리스트.
 */
export default function MyWorriesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const myWorries = SEED_WORRIES.filter((w) => w.isMine);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <PressableScale
          onPress={() => navigation.goBack()}
          haptic="selection"
          style={styles.backBtn}
        >
          <Feather name="chevron-left" size={22} color={colors.textPrimary} />
        </PressableScale>
        <Text variant="subtitle" tone="navy">
          내가 띄운 마음
        </Text>
        <View style={styles.backBtn} />
      </View>

      {myWorries.length === 0 ? (
        <EmptyState
          icon="edit-3"
          title="아직 띄운 마음이 없어요"
          description="첫 번째 마음을 띄워보세요"
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {myWorries.map((w) => (
            <WorryCard
              key={w.id}
              nickname={w.nickname}
              preview={w.body}
              timeAgo={w.createdAt}
              isMine
              replyCount={w.replyCount}
              onPress={() => navigation.navigate("Worry", { id: w.id })}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
    gap: spacing.md,
  },
});
