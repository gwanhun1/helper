import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Feather from "react-native-vector-icons/Feather";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { PressableScale, Text } from "@/components";
import type { RootStackParamList } from "@/App";
import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";

/**
 * 카카오 로그인 화면.
 * UI 단계 — 실제 카카오 SDK 연동은 다음 작업.
 * 익명성 유지: 로그인은 인증/식별용, 글·답장에 닉네임은 노출 안 함.
 */
export default function AuthScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleKakao = () => {
    ReactNativeHapticFeedback.trigger("notificationSuccess", {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });
    // TODO: 실제 카카오 SDK 연결
    navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 브랜드 영역 */}
      <View style={styles.brand}>
        <View style={styles.iconCircle}>
          <Feather name="mail" size={44} color={colors.white} />
        </View>
        <Text variant="display" tone="navy" style={styles.title}>
          마음 지도
        </Text>
        <Text
          variant="body"
          tone="secondary"
          style={{ textAlign: "center", marginTop: spacing.md, lineHeight: 24 }}
        >
          익명으로 마음을 띄우고{"\n"}따뜻한 답장을 받아보세요
        </Text>
      </View>

      {/* 익명성 보장 안내 */}
      <View style={styles.privacy}>
        <View style={styles.privacyRow}>
          <Feather name="moon" size={14} color={colors.mintDeep} />
          <Text variant="caption" tone="secondary">
            글과 답장에 이름은 절대 노출되지 않아요
          </Text>
        </View>
        <View style={styles.privacyRow}>
          <Feather name="lock" size={14} color={colors.mintDeep} />
          <Text variant="caption" tone="secondary">
            답장은 글쓴이에게만 닿아요
          </Text>
        </View>
        <View style={styles.privacyRow}>
          <Feather name="shield" size={14} color={colors.mintDeep} />
          <Text variant="caption" tone="secondary">
            위치는 흐려서 표시돼요
          </Text>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.actions}>
        <PressableScale
          onPress={handleKakao}
          haptic="medium"
          style={styles.kakaoBtn}
        >
          {/* 카카오톡 말풍선 이모지 — 실제 아이콘은 SDK 연결시 교체 */}
          <Text
            style={{
              fontSize: fontSize.lg,
              lineHeight: fontSize.lg * 1.1,
            }}
          >
            💬
          </Text>
          <Text
            style={{
              color: "#191600",
              fontSize: fontSize.base,
              fontWeight: fontWeight.bold,
              letterSpacing: -0.2,
            }}
          >
            카카오로 3초만에 시작하기
          </Text>
        </PressableScale>

        <Text
          variant="caption"
          tone="tertiary"
          style={{ textAlign: "center", marginTop: spacing.md }}
        >
          계속 진행하면 {""}
          <Text
            variant="caption"
            tone="secondary"
            weight="bold"
            style={{ textDecorationLine: "underline" }}
          >
            이용약관
          </Text>
          {" "}및 {""}
          <Text
            variant="caption"
            tone="secondary"
            weight="bold"
            style={{ textDecorationLine: "underline" }}
          >
            개인정보 처리방침
          </Text>
          에 동의한 것으로 간주됩니다
        </Text>
      </View>
    </SafeAreaView>
  );
}

const KAKAO_YELLOW = "#FEE500";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing["3xl"],
    justifyContent: "space-between",
  },
  brand: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: colors.mintDeep,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.lifted,
  },
  title: {
    marginTop: spacing.xl,
  },

  privacy: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  privacyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  actions: {
    paddingBottom: spacing.xl,
  },
  kakaoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: KAKAO_YELLOW,
    paddingVertical: spacing.md + 4,
    borderRadius: radius.xl,
    ...shadow.card,
  },
});
