import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { PressableScale } from "../atoms/PressableScale";
import { PinBubble } from "./PinBubble";

type Props = {
  /** 화면 비율 좌표 0~1 (지도 SDK 붙기 전 placeholder 전용) */
  x: number;
  y: number;
  replyCount?: number;
  isMine?: boolean;
  isHot?: boolean;
  onPress?: () => void;
  /** 핀별 애니메이션 phase delay (자연스러운 비동기) */
  delay?: number;
  size?: number;
};

/**
 * Placeholder 지도에서 쓰는 떠다니는 핀.
 * 위치는 화면 비율(x,y), 시각은 PinBubble 재사용.
 */
export const MapPin = ({
  x,
  y,
  replyCount,
  isMine,
  isHot,
  onPress,
  delay = 0,
  size = 44,
}: Props) => {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-5, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, offset]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const pinHeight = size + Math.round(size * 0.28) / 2; // PinBubble 전체 높이

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          width: size,
          height: pinHeight,
          marginLeft: -size / 2,
          marginTop: -pinHeight, // 꼬리 끝(bottom)이 좌표를 가리킴
        },
        animStyle,
      ]}
    >
      <PressableScale onPress={onPress} haptic="light" scale={0.9}>
        <PinBubble
          replyCount={replyCount}
          isMine={isMine}
          isHot={isHot}
          size={size}
        />
      </PressableScale>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
  },
});
