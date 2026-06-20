import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, spacing } from "@/theme";

import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

type Props = {
  icon: string;
  label: string;
  onPress?: () => void;
  showChevron?: boolean;
  /** 마지막 row면 하단 보더 제거 */
  isLast?: boolean;
  /** 위험 액션(로그아웃 등) */
  destructive?: boolean;
};

export const ListRow = ({
  icon,
  label,
  onPress,
  showChevron = true,
  isLast,
  destructive,
}: Props) => {
  const labelColor = destructive ? colors.coral : colors.textPrimary;
  const iconColor = destructive ? colors.coral : colors.textSecondary;

  return (
    <PressableScale
      scale={0.99}
      haptic="selection"
      onPress={onPress}
      style={[
        styles.row,
        {
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <Feather name={icon} size={18} color={iconColor} />
      <Text
        variant="body"
        style={{ color: labelColor, flex: 1 }}
      >
        {label}
      </Text>
      {showChevron && (
        <Feather name="chevron-right" size={18} color={colors.textTertiary} />
      )}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomColor: colors.border,
  },
});
