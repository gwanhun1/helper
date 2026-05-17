import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  Avatar,
  Badge,
  Button,
  Card,
  PressableScale,
  ReplyCard,
  Text,
} from "@/components";
import { findWorry, repliesForWorry } from "@/data";
import { colors, fontSize, radius, spacing } from "@/theme";

export default function WorryDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const worry = id ? findWorry(id) : undefined;
  const replies = id ? repliesForWorry(id) : [];

  const [reply, setReply] = useState("");

  if (!worry) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text variant="body" tone="secondary">
            마음을 찾을 수 없어요
          </Text>
          <Button label="닫기" variant="ghost" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleSendReply = () => {
    if (!reply.trim()) return;
    // TODO: 실제 답장 저장
    setReply("");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* 헤더 — 닫기 + 카테고리 뱃지 */}
      <View style={styles.header}>
        <PressableScale
          onPress={() => router.back()}
          haptic="selection"
          style={styles.closeBtn}
        >
          <Feather name="x" size={22} color={colors.textPrimary} />
        </PressableScale>
        <Badge label={worry.category} variant="soft" />
        <View style={styles.closeBtn} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 본문 카드 */}
          <Card padding="xl" radiusKey="2xl">
            <View style={styles.authorRow}>
              <Avatar
                icon="moon"
                variant={worry.isMine ? "navy" : "mint"}
                size="md"
              />
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="subtitle" tone="navy">
                  {worry.nickname}
                </Text>
                <Text variant="caption" tone="tertiary">
                  {worry.createdAt} · 근처
                </Text>
              </View>
              {worry.isMine && <Badge label="ME" variant="navy" />}
            </View>
            <Text variant="body" tone="primary" style={styles.body}>
              {worry.body}
            </Text>
          </Card>

          {/* 답장 영역 */}
          <View style={styles.replySection}>
            <View style={styles.replyHeader}>
              <Feather name="mail" size={14} color={colors.mintDeep} />
              <Text variant="subtitle" tone="navy">
                답장 {worry.replyCount}개
              </Text>
            </View>

            {worry.isMine ? (
              // 본인 글 — 답장 내용 노출
              replies.length > 0 ? (
                <View style={{ gap: spacing.md }}>
                  {replies.map((r) => (
                    <ReplyCard
                      key={r.id}
                      fromNickname={r.fromNickname}
                      body={r.body}
                      timeAgo={r.createdAt}
                      hearted={r.hearted}
                    />
                  ))}
                </View>
              ) : (
                <Card variant="soft" padding="xl" shadowed={false}>
                  <View style={styles.emptyReplyMine}>
                    <Feather
                      name="inbox"
                      size={20}
                      color={colors.textTertiary}
                    />
                    <Text variant="caption" tone="tertiary">
                      아직 답장이 도착하지 않았어요
                    </Text>
                  </View>
                </Card>
              )
            ) : (
              // 제3자 — 답장 내용은 잠금
              <Card variant="soft" padding="xl" shadowed={false}>
                <View style={styles.lockBox}>
                  <View style={styles.lockIcon}>
                    <Feather name="lock" size={16} color={colors.navy} />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text variant="body" tone="navy" weight="bold">
                      답장은 글쓴이에게만 닿아요
                    </Text>
                    <Text variant="caption" tone="secondary">
                      다른 사람의 답장은 보이지 않아요. 당신의 마음만 전해져요.
                    </Text>
                  </View>
                </View>
              </Card>
            )}
          </View>
        </ScrollView>

        {/* 답장 입력바 (제3자만) */}
        {!worry.isMine && (
          <View style={styles.composeBar}>
            <TextInput
              value={reply}
              onChangeText={setReply}
              placeholder="따뜻한 답장을 건네보세요"
              placeholderTextColor={colors.textPlaceholder}
              style={styles.input}
              multiline
              maxLength={300}
            />
            <Pressable
              onPress={handleSendReply}
              disabled={!reply.trim()}
              style={({ pressed }) => [
                styles.sendBtn,
                {
                  backgroundColor: reply.trim()
                    ? colors.mintDeep
                    : colors.borderStrong,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Feather name="send" size={16} color={colors.white} />
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
    gap: spacing.xl,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  body: {
    fontSize: fontSize.md,
    lineHeight: 26,
  },

  replySection: {
    gap: spacing.md,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.xs,
  },
  emptyReplyMine: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },

  lockBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  lockIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.navySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  composeBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius["2xl"],
    backgroundColor: colors.surfaceAlt,
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
