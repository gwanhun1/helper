import { View } from "react-native";

import { colors, spacing } from "@/theme";

type Props = {
  vertical?: boolean;
  inset?: keyof typeof spacing;
};

export const Divider = ({ vertical, inset }: Props) => (
  <View
    style={{
      backgroundColor: colors.border,
      ...(vertical
        ? { width: 1, alignSelf: "stretch" }
        : { height: 1, alignSelf: "stretch" }),
      ...(inset && (vertical
        ? { marginVertical: spacing[inset] }
        : { marginHorizontal: spacing[inset] })),
    }}
  />
);
