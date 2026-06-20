import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import type { RootStackParamList } from "@/App";

const HAPTIC_OPTS = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

import {
  AnswerKingCard,
  Avatar,
  Card,
  ListRow,
  PressableScale,
  Screen,
  Text,
} from "@/components";
import { colors, fontSize, fontWeight, radius, spacing } from "@/theme";
import { generateNickname } from "@/utils/nickname";

// 누적 통계
const TOTALS = {
  worries: 7,
  replies: 12,
  hearts: 4,
};

const WEEKLY_REPLIES = 4;

export default function MeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nickname, setNickname] = useState("잠 못 드는 토끼");

  const handleChangeNickname = () => {
    ReactNativeHapticFeedback.trigger("selection", HAPTIC_OPTS);
    const next = generateNickname();
    Alert.alert(
      "새 닉네임",
      `"${next}"으로 변경할까요?`,
      [
        { text: "다시 뽑기", onPress: handleChangeNickname },
        { text: "취소", style: "cancel" },
        {
          text: "변경",
          onPress: () => {
            setNickname(next);
            ReactNativeHapticFeedback.trigger(
              "notificationSuccess",
              HAPTIC_OPTS,
            );
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠어요?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: () =>
          navigation.reset({ index: 0, routes: [{ name: "Auth" }] }),
      },
    ]);
  };

  return (
    <Screen edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing["4xl"] }}
        showsVerticalScrollIndicator={false}
      >
        {/* ============ Hero ============ */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <Avatar icon="moon" variant="mint" size="lg" />
            <View style={{ flex: 1, gap: 4 }}>
              <View style={styles.nicknameRow}>
                <Text variant="title" tone="navy" numberOfLines={1}>
                  {nickname}
                </Text>
                <PressableScale
                  onPress={handleChangeNickname}
                  haptic="off"
                  scale={0.9}
                  style={styles.editBtn}
                >
                  <Feather name="edit-2" size={14} color={colors.mintDeep} />
                </PressableScale>
              </View>
              <View style={styles.kakaoBadge}>
                <Text style={styles.kakaoEmoji}>💬</Text>
                <Text variant="caption" tone="secondary" weight="semibold">
                  카카오 연결됨
                </Text>
              </View>
            </View>
          </View>

          {/* 누적 요약 한 줄 */}
          <View style={styles.summaryRow}>
            <SummaryStat icon="edit-3" value={TOTALS.worries} label="띄운" />
            <View style={styles.summaryDivider} />
            <SummaryStat icon="send" value={TOTALS.replies} label="답장" />
            <View style={styles.summaryDivider} />
            <SummaryStat
              icon="heart"
              value={TOTALS.hearts}
              label="받은 ♥"
              accent="coral"
            />
          </View>
        </View>

        {/* ============ 답변왕 ============ */}
        <View style={{ marginBottom: spacing.lg }}>
          <AnswerKingCard
            weeklyCount={WEEKLY_REPLIES}
            rankPercent={8}
            region="강남역"
          />
        </View>

        {/* ============ 활동 모음 ============ */}
        <Card padding="xs" style={styles.card}>
          <ListRow
            icon="edit-3"
            label="내가 띄운 마음"
            onPress={() => navigation.navigate("MyWorries")}
          />
          <ListRow
            icon="send"
            label="내가 보낸 답장"
            onPress={() => navigation.navigate("MyReplies")}
          />
          <ListRow
            icon="bar-chart-2"
            label="마음 통계"
            onPress={() => navigation.navigate("Insights")}
            isLast
          />
        </Card>

        {/* ============ 설정 ============ */}
        <Card padding="xs" style={styles.card}>
          <ListRow icon="bell" label="알림 설정" />
          <ListRow icon="map-pin" label="위치 권한" />
          <ListRow icon="slash" label="차단 목록" />
          <ListRow icon="flag" label="신고 내역" isLast />
        </Card>

        {/* ============ Footer ============ */}
        <View style={styles.footer}>
          <PressableScale
            onPress={handleLogout}
            haptic="selection"
            scale={0.97}
          >
            <Text
              variant="caption"
              tone="tertiary"
              weight="bold"
              style={styles.footerLink}
            >
              로그아웃
            </Text>
          </PressableScale>
          <View style={styles.footerSep} />
          <Text variant="caption" tone="tertiary">
            이용약관
          </Text>
          <View style={styles.footerSep} />
          <Text variant="caption" tone="tertiary">
            v2.0.0
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

// =============== SummaryStat ===============

const SummaryStat = ({
  icon,
  value,
  label,
  accent = "navy",
}: {
  icon: string;
  value: number;
  label: string;
  accent?: "navy" | "coral";
}) => {
  const valueColor = accent === "coral" ? colors.coral : colors.navy;
  return (
    <View style={styles.summaryStat}>
      <Feather name={icon} size={13} color={colors.textTertiary} />
      <Text
        style={{
          color: valueColor,
          fontSize: fontSize.lg,
          fontWeight: fontWeight.black,
          letterSpacing: -0.5,
        }}
      >
        {value}
      </Text>
      <Text variant="caption" tone="tertiary">
        {label}
      </Text>
    </View>
  );
};

// =============== 스타일 ===============

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius["2xl"],
    padding: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  nicknameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  editBtn: {
    width: 26,
    height: 26,
    borderRadius: radius.full,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  kakaoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    backgroundColor: "#FEE50033",
    borderWidth: 1,
    borderColor: "#FEE500AA",
  },
  kakaoEmoji: {
    fontSize: 10,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryStat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  summaryDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },

  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  footerLink: {
    textDecorationLine: "underline",
  },
  footerSep: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.borderStrong,
  },
});
