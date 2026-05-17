import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors, radius, spacing } from "@/theme";

import { Text } from "../atoms/Text";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description?: string;
};

export const EmptyState = ({ icon, title, description }: Props) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <Feather name={icon} size={28} color={colors.mintDeep} />
      </View>
      <Text variant="subtitle" tone="secondary">
        {title}
      </Text>
      {description && (
        <Text variant="caption" tone="tertiary">
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    paddingBottom: spacing["5xl"],
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
});
