import { StyleSheet, View, ViewStyle } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { colors, radius, shadow, spacing } from "@/theme";

import { PressableScale } from "../atoms/PressableScale";
import { Text } from "../atoms/Text";

type Props = {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

/**
 * 지도 풀스크린 하단의 peek 시트(닫힌 상태).
 * 추후 @gorhom/bottom-sheet으로 교체해 드래그 가능하게 확장 예정.
 */
export const PeekSheet = ({
  title,
  subtitle,
  icon = "map-pin",
  onPress,
  style,
}: Props) => {
  return (
    <PressableScale
      onPress={onPress}
      scale={0.99}
      haptic="selection"
      style={[styles.sheet, style]}
    >
      <View style={styles.handle} />
      <View style={styles.row}>
        <View style={styles.icon}>
          <Feather name={icon} size={14} color={colors.mintDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="body" tone="navy" weight="bold">
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" tone="tertiary" style={{ marginTop: 2 }}>
              {subtitle}
            </Text>
          )}
        </View>
        <Feather name="chevron-up" size={18} color={colors.textTertiary} />
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius["3xl"],
    borderTopRightRadius: radius["3xl"],
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    ...shadow.lifted,
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.borderStrong,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});
