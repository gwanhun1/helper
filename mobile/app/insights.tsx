import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@/App";

import {
  Card,
  Divider,
  MoodPieChart,
  PressableScale,
  Text,
  WeekdayBarChart,
} from "@/components";
import { colors, fontSize, fontWeight, spacing } from "@/theme";

const MOOD_DATA = [
  { label: "평온함", value: 12, color: colors.mintDeep },
  { label: "차분함", value: 8, color: colors.mint },
  { label: "힘듦", value: 4, color: colors.coral },
];

const WEEKDAY_DATA = [3, 1, 4, 2, 5, 6, 3];

const TIME_DATA = [
  { label: "아침", time: "05–12", count: 4, emoji: "🌅" },
  { label: "오후", time: "12–17", count: 3, emoji: "☀️" },
  { label: "저녁", time: "17–21", count: 8, emoji: "🌆" },
  { label: "밤", time: "21–05", count: 9, emoji: "🌙" },
];

export default function InsightsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <PressableScale
          onPress={() => navigation.goBack()}
          haptic="selection"
          style={styles.backBtn}
        >
          <Feather name="chevron-left" size={22} color={colors.textPrimary} />
        </PressableScale>
        <Text variant="subtitle" tone="navy">
          마음 통계
        </Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* 한 줄 요약 헤더 */}
        <View style={styles.intro}>
          <Text variant="eyebrow" tone="mintDeep">
            지난 30일 분석
          </Text>
          <Text variant="display" tone="navy" style={{ marginTop: 4 }}>
            평온한 편이에요
          </Text>
          <Text
            variant="body"
            tone="secondary"
            style={{ marginTop: spacing.sm, lineHeight: 22 }}
          >
            24개의 마음 조각을 분석한 결과,{"\n"}
            평균 마음 온도는{" "}
            <Text
              style={{
                color: colors.mintDeep,
                fontWeight: fontWeight.black,
                fontSize: fontSize.base,
              }}
            >
              7.2점 / 10
            </Text>
            이에요
          </Text>
        </View>

        {/* 마음 분포 */}
        <Card style={styles.card} padding="xl">
          <Text variant="eyebrow" tone="mintDeep">
            마음 분포도
          </Text>
          <Text variant="subtitle" tone="navy" style={{ marginTop: 4 }}>
            평온함이 가장 많아요
          </Text>
          <View style={{ marginTop: spacing.xl }}>
            <MoodPieChart data={MOOD_DATA} size={170} />
          </View>
        </Card>

        {/* 요일별 기록 */}
        <Card style={styles.card} padding="xl">
          <Text variant="eyebrow" tone="mintDeep">
            요일별 기록
          </Text>
          <Text variant="subtitle" tone="navy" style={{ marginTop: 4 }}>
            금요일에 가장 많이 띄웠어요
          </Text>
          <View style={{ marginTop: spacing.xl }}>
            <WeekdayBarChart data={WEEKDAY_DATA} />
          </View>
        </Card>

        {/* 시간대별 기록 */}
        <Card style={styles.card} padding="xl">
          <Text variant="eyebrow" tone="mintDeep">
            시간대별 기록
          </Text>
          <Text variant="subtitle" tone="navy" style={{ marginTop: 4 }}>
            저녁과 밤에 마음이 깊어져요
          </Text>
          <View style={styles.timeGrid}>
            {TIME_DATA.map((t) => (
              <View key={t.label} style={styles.timeCard}>
                <Text
                  style={{ fontSize: fontSize.xl, marginBottom: 2 }}
                >
                  {t.emoji}
                </Text>
                <Text variant="caption" tone="tertiary">
                  {t.time}
                </Text>
                <Text
                  variant="subtitle"
                  tone="navy"
                  style={{ marginTop: spacing.xs }}
                >
                  {t.count}개
                </Text>
                <Text variant="caption" tone="secondary">
                  {t.label}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* AI 인사이트 (reverse 카드) */}
        <View style={styles.aiCard}>
          <View style={styles.aiHead}>
            <Feather name="cpu" size={14} color={colors.mint} />
            <Text
              style={{
                color: colors.mint,
                fontSize: fontSize.xs,
                fontWeight: fontWeight.black,
                letterSpacing: 2,
              }}
            >
              AI 인사이트
            </Text>
          </View>
          <Text
            style={{
              color: colors.white,
              fontSize: fontSize.md,
              fontWeight: fontWeight.bold,
              letterSpacing: -0.3,
              marginTop: spacing.sm,
              lineHeight: 26,
            }}
          >
            요즘 밤 시간대 기록이{"\n"}많아지고 있어요
          </Text>
          <Text
            style={{
              color: "#94A3B8",
              fontSize: fontSize.sm,
              lineHeight: 22,
              marginTop: spacing.sm,
            }}
          >
            잠들기 전 5분 명상이 내일의 마음 온도를{"\n"}
            1도 더 높여줄 수 있어요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingBottom: spacing["4xl"],
  },
  intro: {
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  timeCard: {
    flexBasis: "47%",
    flexGrow: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    padding: spacing.md,
    alignItems: "flex-start",
  },

  aiCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.navy,
    borderRadius: 20,
    padding: spacing.xl,
    marginTop: spacing.xs,
  },
  aiHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
