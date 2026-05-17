import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { Text } from "../atoms/Text";
import { colors, spacing } from "@/theme";

type Slice = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: Slice[];
  size?: number;
};

/**
 * 도넛 형태 mood pie chart — SVG로 직접 그림.
 * 의존성: react-native-svg.
 */
export const MoodPieChart = ({ data, size = 160 }: Props) => {
  const total = data.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = size / 2;
  const stroke = size * 0.18;
  const innerR = radius - stroke / 2;
  const circumference = 2 * Math.PI * innerR;

  let acc = 0;
  const segments = data.map((s) => {
    const fraction = s.value / total;
    const dashLen = fraction * circumference;
    const offset = circumference - acc;
    acc += dashLen;
    return {
      ...s,
      dashLen,
      offset,
    };
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={size} height={size}>
        {/* 배경 트랙 */}
        <Circle
          cx={radius}
          cy={radius}
          r={innerR}
          stroke={colors.surfaceAlt}
          strokeWidth={stroke}
          fill="none"
        />
        {/* segments */}
        <G rotation={-90} origin={`${radius}, ${radius}`}>
          {segments.map((s, i) => (
            <Circle
              key={i}
              cx={radius}
              cy={radius}
              r={innerR}
              stroke={s.color}
              strokeWidth={stroke}
              fill="none"
              strokeDasharray={`${s.dashLen} ${circumference}`}
              strokeDashoffset={s.offset}
              strokeLinecap="butt"
            />
          ))}
        </G>
      </Svg>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: spacing.md,
          marginTop: spacing.lg,
        }}
      >
        {data.map((s) => (
          <View
            key={s.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: s.color,
              }}
            />
            <Text variant="caption" tone="secondary">
              {s.label} {Math.round((s.value / total) * 100)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
