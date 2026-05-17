import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

import { Text, WorryCard } from "@/components";
import type { Worry } from "@/data";
import { colors, radius, spacing } from "@/theme";

type Props = {
  worries: Worry[];
  onPinPress: (id: string) => void;
};

/**
 * 지도 하단 풀 바텀시트.
 * Peek 상태에선 안내문, 위로 드래그하면 근처 마음 리스트 표시.
 * 스냅 포인트: 90px (peek) / 50% / 90%
 */
export const NearbyWorrySheet = ({ worries, onPinPress }: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [90, "50%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.25}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.background}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetFlatList
        data={worries}
        keyExtractor={(w) => w.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.head}>
            <View style={styles.headIcon}>
              <Feather name="map-pin" size={14} color={colors.mintDeep} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="body" tone="navy" weight="bold">
                이 근처에서 들려오는 마음
              </Text>
              <Text variant="caption" tone="tertiary" style={{ marginTop: 2 }}>
                위로 올려서 둘러보세요
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <WorryCard
            nickname={item.nickname}
            preview={item.body}
            timeAgo={item.createdAt}
            isMine={item.isMine}
            replyCount={item.replyCount}
            onPress={() => onPinPress(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius["3xl"],
    borderTopRightRadius: radius["3xl"],
  },
  handle: {
    backgroundColor: colors.borderStrong,
    width: 36,
    height: 4,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing["3xl"],
  },
});
