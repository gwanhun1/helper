import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, PressableScale, Text } from "@/components";
import type { RootStackParamList } from "@/App";
import { colors, fontSize, fontWeight, radius, shadow, spacing } from "@/theme";

const { width: SCREEN_W } = Dimensions.get("window");

type Slide = {
  key: string;
  icon: string;
  title: string;
  subtitle: string;
  accent: "mint" | "navy" | "coral" | "gold";
};

const SLIDES: Slide[] = [
  {
    key: "map",
    icon: "map",
    title: "지도 위에 떠있는\n누군가의 마음",
    subtitle:
      "근처에서 들려오는 익명의 고민들이\n잔잔히 떠있어요. 한 번 들여다보세요.",
    accent: "mint",
  },
  {
    key: "anon",
    icon: "moon",
    title: "익명으로 안전하게",
    subtitle:
      "누가 썼는지, 누가 답장했는지\n아무도 몰라요. 마음만 전해져요.",
    accent: "navy",
  },
  {
    key: "private",
    icon: "lock",
    title: "답장은 글쓴이에게만",
    subtitle:
      "제3자는 답장 카운트만 볼 수 있어요.\n내용은 오직 작성자에게만 닿아요.",
    accent: "coral",
  },
  {
    key: "location",
    icon: "shield",
    title: "정확한 위치는 가려져요",
    subtitle:
      "GPS 좌표는 살짝 흐려서 표시돼요.\n안심하고 마음을 띄워보세요.",
    accent: "gold",
  },
];

const accentColor = (a: Slide["accent"]) => {
  switch (a) {
    case "mint":
      return { bg: colors.mintSoft, fg: colors.mintDeep };
    case "navy":
      return { bg: colors.navySoft, fg: colors.navy };
    case "coral":
      return { bg: colors.coralSoft, fg: colors.coral };
    case "gold":
      return { bg: colors.goldSoft, fg: "#8A6A1F" };
  }
};

export default function OnboardingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const handleViewable = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (first?.index != null) setIndex(first.index);
    },
  ).current;

  const handleNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
    }
  };

  const handleSkip = () => navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 — Skip */}
      <View style={styles.topBar}>
        <View />
        <PressableScale onPress={handleSkip} haptic="selection">
          <Text variant="caption" tone="tertiary" weight="bold">
            건너뛰기
          </Text>
        </PressableScale>
      </View>

      {/* 슬라이드 */}
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        renderItem={({ item }) => <Slide slide={item} />}
      />

      {/* 페이지 인디케이터 */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: i === index ? 22 : 6,
                backgroundColor:
                  i === index ? colors.mintDeep : colors.borderStrong,
              },
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          label={index === SLIDES.length - 1 ? "시작하기" : "다음"}
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleNext}
          icon={index === SLIDES.length - 1 ? "arrow-right" : undefined}
        />
      </View>
    </SafeAreaView>
  );
}

// =========== Slide ===========

const Slide = ({ slide }: { slide: Slide }) => {
  const accent = accentColor(slide.accent);
  return (
    <View style={[styles.slide, { width: SCREEN_W }]}>
      <View style={[styles.iconCircle, { backgroundColor: accent.bg }]}>
        <Feather name={slide.icon} size={56} color={accent.fg} />
      </View>
      <Text
        style={{
          color: colors.navy,
          fontSize: fontSize["2xl"],
          fontWeight: fontWeight.black,
          textAlign: "center",
          letterSpacing: -0.8,
          lineHeight: fontSize["2xl"] * 1.3,
          marginTop: spacing["3xl"],
        }}
      >
        {slide.title}
      </Text>
      <Text
        variant="body"
        tone="secondary"
        style={{
          textAlign: "center",
          lineHeight: 24,
          marginTop: spacing.lg,
        }}
      >
        {slide.subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["3xl"],
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.subtle,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  dot: {
    height: 6,
    borderRadius: radius.full,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
