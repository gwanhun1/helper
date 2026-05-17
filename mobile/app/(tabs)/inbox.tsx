import { ScrollView, StyleSheet, View } from "react-native";

import { EmptyState, Screen, SectionHeader, WorryCard } from "@/components";
import { spacing } from "@/theme";

// 시드 데이터 — 실제 데이터 연결 시 제거
const SEED: Array<{
  id: string;
  nickname: string;
  preview: string;
  timeAgo: string;
  replyCount: number;
}> = [];

export default function InboxScreen() {
  const hasItems = SEED.length > 0;

  return (
    <Screen edges={["top"]}>
      <SectionHeader
        eyebrow="받은 답장"
        title={hasItems ? "따뜻한 마음들이 도착했어요" : "아직 답장이 없어요"}
        subtitle={
          hasItems
            ? undefined
            : "마음을 띄워두면 누군가 답장을 보내올 거예요"
        }
      />
      {hasItems ? (
        <ScrollView contentContainerStyle={styles.list}>
          {SEED.map((item) => (
            <WorryCard key={item.id} {...item} />
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          icon="inbox"
          title="새 답장이 오면 여기에 표시돼요"
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
    gap: spacing.md,
  },
});
