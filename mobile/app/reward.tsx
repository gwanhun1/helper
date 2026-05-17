import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import type { RootStackParamList } from "@/App";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Button, Text } from "@/components";
import { colors, radius, shadow, spacing } from "@/theme";

/**
 * 답장 전송 또는 글 작성 완료 후 잔잔한 보상 화면.
 *
 * URL params:
 *  - type: "reply" | "post"  (기본 "reply")
 *  - count: 보낸 / 받은 카운트 (옵션)
 */
export default function RewardScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Reward">>();
  const { type = "reply", count } = route.params ?? {};

  const isReply = type === "reply";

  // 애니메이션 값들
  const iconScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const subOpacity = useSharedValue(0);
  const star1 = useSharedValue(0);
  const star2 = useSharedValue(0);
  const star3 = useSharedValue(0);

  useEffect(() => {
    // 햅틱
    ReactNativeHapticFeedback.trigger("notificationSuccess", {
      enableVibrateFallback: false,
      ignoreAndroidSystemSettings: false,
    });

    // 아이콘 등장: scale 0 → 1 spring
    iconScale.value = withSpring(1, { damping: 12, stiffness: 100 });

    // 별빛 등장 (각자 다른 delay)
    star1.value = withDelay(
      150,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
    star2.value = withDelay(
      300,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
    star3.value = withDelay(
      450,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );

    // 텍스트 fade in
    titleOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 500 }),
    );
    subOpacity.value = withDelay(
      500,
      withTiming(1, { duration: 500 }),
    );
  }, [iconScale, titleOpacity, subOpacity, star1, star2, star3]);

  // 아이콘 — 등장 후 부드러운 pulse
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      { translateY: withTiming((1 - titleOpacity.value) * 10) },
    ],
  }));
  const subStyle = useAnimatedStyle(() => ({
    opacity: subOpacity.value,
  }));
  const star1Style = useAnimatedStyle(() => ({
    opacity: star1.value,
    transform: [
      { translateY: -star1.value * 30 },
      { scale: 0.5 + star1.value * 0.5 },
    ],
  }));
  const star2Style = useAnimatedStyle(() => ({
    opacity: star2.value,
    transform: [
      { translateY: -star2.value * 40 },
      { scale: 0.5 + star2.value * 0.5 },
    ],
  }));
  const star3Style = useAnimatedStyle(() => ({
    opacity: star3.value,
    transform: [
      { translateY: -star3.value * 25 },
      { scale: 0.5 + star3.value * 0.5 },
    ],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        {/* 별빛들 (아이콘 주변에 흩어진 작은 점들) */}
        <Animated.View style={[styles.star, styles.star1, star1Style]} />
        <Animated.View style={[styles.star, styles.star2, star2Style]} />
        <Animated.View style={[styles.star, styles.star3, star3Style]} />

        {/* 메인 아이콘 — 큰 동그라미 */}
        <Animated.View style={[styles.iconWrap, iconStyle]}>
          <Feather
            name={isReply ? "send" : "feather"}
            size={48}
            color={colors.white}
          />
        </Animated.View>

        {/* 타이틀 */}
        <Animated.View style={titleStyle}>
          <Text
            variant="display"
            tone="navy"
            style={{ textAlign: "center", marginTop: spacing["3xl"] }}
          >
            {isReply ? "마음이 닿았어요" : "마음이 띄워졌어요"}
          </Text>
        </Animated.View>

        {/* 서브 텍스트 */}
        <Animated.View style={[{ alignItems: "center" }, subStyle]}>
          <Text
            variant="body"
            tone="secondary"
            style={{
              textAlign: "center",
              marginTop: spacing.md,
              lineHeight: 24,
            }}
          >
            {isReply
              ? `오늘 ${count || 1}명에게 따뜻함을 건넸어요`
              : "근처 누군가가 답장을 보내올 거예요"}
          </Text>
        </Animated.View>
      </View>

      {/* 하단 액션 */}
      <View style={styles.footer}>
        <Button
          label="지도로 돌아가기"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Tabs" }] })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const STAR_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["3xl"],
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
    backgroundColor: colors.mintDeep,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.lifted,
  },
  star: {
    position: "absolute",
    width: STAR_SIZE,
    height: STAR_SIZE,
    borderRadius: STAR_SIZE / 2,
    backgroundColor: colors.gold,
  },
  star1: {
    top: "32%",
    left: "28%",
  },
  star2: {
    top: "30%",
    right: "26%",
  },
  star3: {
    top: "44%",
    right: "20%",
    backgroundColor: colors.mint,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
