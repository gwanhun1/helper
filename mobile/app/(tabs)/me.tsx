import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  Avatar,
  Card,
  ListRow,
  Screen,
  StatCard,
  Text,
} from "@/components";
import { colors, spacing } from "@/theme";

type StatItem = {
  icon: keyof typeof Feather.glyphMap;
  value: number;
  label: string;
};

const STATS: StatItem[] = [
  { icon: "edit-3", value: 0, label: "띄운 마음" },
  { icon: "send", value: 0, label: "보낸 답장" },
  { icon: "heart", value: 0, label: "받은 ♥" },
];

type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  destructive?: boolean;
};

const MENU: MenuItem[] = [
  { icon: "bell", label: "알림 설정" },
  { icon: "map-pin", label: "위치 권한" },
  { icon: "slash", label: "차단 목록" },
  { icon: "flag", label: "신고 내역" },
  { icon: "log-out", label: "로그아웃", destructive: true },
];

export default function MeScreen() {
  return (
    <Screen edges={["top"]}>
      {/* 프로필 */}
      <View style={styles.header}>
        <Avatar icon="moon" variant="mint" size="lg" />
        <View style={{ gap: 4 }}>
          <Text variant="subtitle" tone="navy">
            잠 못 드는 토끼
          </Text>
          <Text variant="caption" tone="tertiary">
            익명 닉네임 · 변경 가능
          </Text>
        </View>
      </View>

      {/* 통계 */}
      <View style={styles.stats}>
        {STATS.map((s) => (
          <StatCard
            key={s.label}
            icon={s.icon}
            value={s.value}
            label={s.label}
          />
        ))}
      </View>

      {/* 메뉴 리스트 */}
      <Card padding="xs" style={styles.menu}>
        {MENU.map((m, i) => (
          <ListRow
            key={m.label}
            icon={m.icon}
            label={m.label}
            destructive={m.destructive}
            isLast={i === MENU.length - 1}
          />
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  stats: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  menu: {
    marginHorizontal: spacing.lg,
  },
});
