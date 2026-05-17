import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, spacing } from "@/theme";

import { Avatar } from "../atoms/Avatar";
import { Badge } from "../atoms/Badge";
import { Card } from "../atoms/Card";
import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

type Props = {
  nickname: string;
  preview: string;
  timeAgo: string;
  /** 작성자 본인 글 표시 */
  isMine?: boolean;
  /** 받은 답장 수 — 있으면 코랄 뱃지 */
  replyCount?: number;
  onPress?: () => void;
};

/**
 * 받은답장 탭 / peek 시트 / 핀 상세 등에서 재사용되는 핵심 카드.
 */
export const WorryCard = ({
  nickname,
  preview,
  timeAgo,
  isMine,
  replyCount,
  onPress,
}: Props) => {
  return (
    <PressableScale scale={0.98} onPress={onPress}>
      <Card padding="lg">
        <View style={styles.head}>
          <Avatar size="sm" icon="moon" variant={isMine ? "navy" : "mint"} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="subtitle" tone="navy">
              {nickname}
            </Text>
            <Text variant="caption" tone="tertiary">
              {timeAgo}
            </Text>
          </View>
          {isMine && <Badge label="ME" variant="navy" />}
          {!isMine && replyCount !== undefined && replyCount > 0 && (
            <Badge label={`답장 ${replyCount}`} variant="coral" />
          )}
        </View>
        <Text
          variant="body"
          tone="secondary"
          numberOfLines={3}
          style={styles.preview}
        >
          {preview}
        </Text>
        {replyCount !== undefined && replyCount > 0 && (
          <View style={styles.footer}>
            <Feather name="mail" size={12} color={colors.coral} />
            <Text variant="caption" tone="coral" weight="bold">
              새 답장 {replyCount}건
            </Text>
          </View>
        )}
      </Card>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  preview: {
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
