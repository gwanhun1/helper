import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Badge,
  Card,
  EmptyState,
  PressableScale,
  Text,
} from "@/components";
import type { RootStackParamList } from "@/App";
import { listMyReplies } from "@/data";
import { colors, radius, shadow, spacing } from "@/theme";

/**
 * 내가 보낸 답장 모음.
 * 답변자 본인만 보는 페이지 — 다른 답변자가 같은 글에 보낸 답장은 안 보임.
 */
export default function MyRepliesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const entries = listMyReplies();

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
          내가 보낸 답장
        </Text>
        <View style={styles.backBtn} />
      </View>

      {entries.length === 0 ? (
        <EmptyState
          icon="send"
          title="아직 답장을 보내지 않았어요"
          description="누군가의 마음에 따뜻함을 건네보세요"
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoBanner}>
            <Feather name="lock" size={14} color={colors.mintDeep} />
            <Text
              variant="caption"
              tone="secondary"
              style={{ flex: 1, lineHeight: 18 }}
            >
              여기 표시되는 답장은 글쓴이에게만 닿았어요. 다른 답변자는 못 봐요.
            </Text>
          </View>

          {entries.map(({ reply, worry }) => (
            <PressableScale
              key={reply.id}
              scale={0.98}
              onPress={() =>
                worry && navigation.navigate("Worry", { id: worry.id })
              }
            >
              <Card padding="lg">
                {/* 원본 글 미리보기 */}
                {worry && (
                  <View style={styles.originalRow}>
                    <Badge label={worry.category} variant="soft" />
                    <Text variant="caption" tone="tertiary">
                      {worry.nickname}
                    </Text>
                  </View>
                )}
                {worry && (
                  <Text
                    variant="caption"
                    tone="secondary"
                    numberOfLines={2}
                    style={styles.originalPreview}
                  >
                    {worry.body}
                  </Text>
                )}

                {/* 구분선 */}
                <View style={styles.replyDivider} />

                {/* 내가 보낸 답장 */}
                <View style={styles.myReplyHead}>
                  <View style={styles.myReplyBadge}>
                    <Feather name="send" size={11} color={colors.white} />
                    <Text style={styles.myReplyBadgeText}>내가 보낸 답장</Text>
                  </View>
                  <Text variant="caption" tone="tertiary">
                    {reply.createdAt}
                  </Text>
                </View>
                <Text
                  variant="body"
                  tone="primary"
                  style={{ marginTop: spacing.sm, lineHeight: 22 }}
                >
                  {reply.body}
                </Text>
              </Card>
            </PressableScale>
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
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.mintSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    marginBottom: spacing.xs,
  },
  originalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  originalPreview: {
    marginTop: spacing.sm,
    lineHeight: 18,
    fontStyle: "italic",
  },
  replyDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  myReplyHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  myReplyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.mintDeep,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.full,
    ...shadow.subtle,
  },
  myReplyBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800" as const,
  },
});
