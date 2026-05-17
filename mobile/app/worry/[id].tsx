import { useRef, useState } from "react";
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
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

import type { RootStackParamList } from "@/App";

import {
  Avatar,
  Badge,
  Button,
  Card,
  PressableScale,
  ReplyCard,
  ReportSheet,
  Text,
} from "@/components";
import { findWorry, myReplyToWorry, repliesForWorry } from "@/data";
import { colors, fontSize, radius, spacing } from "@/theme";

export default function WorryDetailModal() {
  const route = useRoute<RouteProp<RootStackParamList, "Worry">>();
  const { id } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const worry = id ? findWorry(id) : undefined;
  const replies = id ? repliesForWorry(id) : [];
  const myReply = id ? myReplyToWorry(id) : undefined;
  // 다른 답변자가 보낸 답장 수 (내 답장 제외)
  const otherRepliesCount = (worry?.replyCount ?? 0) - (myReply ? 1 : 0);

  const [reply, setReply] = useState("");
  const reportRef = useRef<{ open: () => void; close: () => void }>(null);

  if (!worry) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text variant="body" tone="secondary">
            마음을 찾을 수 없어요
          </Text>
          <Button label="닫기" variant="ghost" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleSendReply = () => {
    if (!reply.trim()) return;
    // TODO: 실제 답장 저장
    setReply("");
    navigation.replace("Reward", { type: "reply", count: "1" });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* 헤더 — 닫기 + 카테고리 뱃지 */}
      <View style={styles.header}>
        <PressableScale
          onPress={() => navigation.goBack()}
          haptic="selection"
          style={styles.closeBtn}
        >
          <Feather name="x" size={22} color={colors.textPrimary} />
        </PressableScale>
        <Badge label={worry.category} variant="soft" />
        <PressableScale
          onPress={() => reportRef.current?.open()}
          haptic="selection"
          style={styles.closeBtn}
        >
          <Feather name="flag" size={20} color={colors.textTertiary} />
        </PressableScale>
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
            ) : myReply ? (
              // 답변자 본인 — 자기가 쓴 답장만 보이고 다른 답변자는 카운트만
              <View style={{ gap: spacing.md }}>
                <Card padding="lg" style={styles.myReplyCard}>
                  <View style={styles.myReplyHead}>
                    <View style={styles.myReplyBadge}>
                      <Feather name="send" size={12} color={colors.white} />
                      <Text style={styles.myReplyBadgeText}>내가 보낸 답장</Text>
                    </View>
                    <Text variant="caption" tone="tertiary">
                      {myReply.createdAt}
                    </Text>
                  </View>
                  <Text
                    variant="body"
                    tone="primary"
                    style={{ marginTop: spacing.md, lineHeight: 22 }}
                  >
                    {myReply.body}
                  </Text>
                </Card>

                {otherRepliesCount > 0 && (
                  <Card variant="soft" padding="lg" shadowed={false}>
                    <View style={styles.othersRow}>
                      <Feather name="users" size={14} color={colors.textSecondary} />
                      <Text variant="caption" tone="secondary">
                        다른 답변자 {otherRepliesCount}명의 답장은
                        글쓴이에게만 닿아요
                      </Text>
                    </View>
                  </Card>
                )}
              </View>
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

        {/* 답장 입력바 — 제3자 + 아직 답장 안 한 경우만 */}
        {!worry.isMine && !myReply && (
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

      {/* 신고 시트 */}
      <ReportSheet controllerRef={reportRef} />
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

  myReplyCard: {
    borderColor: colors.mintSoft,
    borderWidth: 1.5,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  myReplyBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs - 1,
    fontWeight: "800" as const,
  },
  othersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
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
