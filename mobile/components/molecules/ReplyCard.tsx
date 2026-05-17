import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, spacing } from "@/theme";

import { Avatar } from "../atoms/Avatar";
import { Card } from "../atoms/Card";
import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

type Props = {
  fromNickname: string;
  body: string;
  timeAgo: string;
  hearted?: boolean;
  onHeart?: () => void;
};

/**
 * 받은 답장 하나의 카드. 작성자만 볼 수 있는 화면에서 사용.
 * 우측 ♥ 버튼으로 답장자에게 감사 표시.
 */
export const ReplyCard = ({
  fromNickname,
  body,
  timeAgo,
  hearted,
  onHeart,
}: Props) => {
  return (
    <Card padding="lg">
      <View style={styles.head}>
        <Avatar size="sm" icon="moon" variant="soft" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="subtitle" tone="navy">
            {fromNickname}
          </Text>
          <Text variant="caption" tone="tertiary">
            {timeAgo}
          </Text>
        </View>
        <PressableScale onPress={onHeart} haptic="selection" style={styles.heart}>
          <Feather
            name="heart"
            size={18}
            color={hearted ? colors.coral : colors.textTertiary}
          />
        </PressableScale>
      </View>
      <Text variant="body" tone="primary" style={styles.body}>
        {body}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  heart: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    lineHeight: 22,
  },
});
