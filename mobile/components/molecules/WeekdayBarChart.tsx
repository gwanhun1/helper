import { StyleSheet, View } from "react-native";

import { Text } from "../atoms/Text";
import { colors, radius, spacing } from "@/theme";

type Props = {
  /** 요일별 카운트 [일,월,화,수,목,금,토] */
  data: number[];
};

const LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export const WeekdayBarChart = ({ data }: Props) => {
  const max = Math.max(1, ...data);
  const todayIdx = new Date().getDay();

  return (
    <View style={styles.row}>
      {data.map((v, i) => {
        const ratio = v / max;
        const isToday = i === todayIdx;
        return (
          <View key={i} style={styles.col}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    height: `${Math.max(8, ratio * 100)}%`,
                    backgroundColor: isToday
                      ? colors.mintDeep
                      : colors.mintSoft,
                  },
                ]}
              />
            </View>
            <Text
              variant="caption"
              tone={isToday ? "mintDeep" : "tertiary"}
              weight={isToday ? "bold" : "medium"}
            >
              {LABELS[i]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    height: 140,
  },
  col: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  barTrack: {
    width: "100%",
    height: 110,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: radius.md,
  },
});
