import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Button, PressableScale, Text } from "@/components";
import { colors, radius, spacing } from "@/theme";

type ReportReason =
  | "abuse"
  | "hate"
  | "stalking"
  | "ad"
  | "other";

const REASONS: { key: ReportReason; label: string; icon: string }[] = [
  { key: "abuse", label: "욕설 / 비속어", icon: "alert-circle" },
  { key: "hate", label: "혐오 / 차별 표현", icon: "x-octagon" },
  { key: "stalking", label: "스토킹 / 위협", icon: "shield-off" },
  { key: "ad", label: "광고 / 스팸", icon: "tag" },
  { key: "other", label: "기타", icon: "more-horizontal" },
];

export type ReportController = { open: () => void; close: () => void };

type Props = {
  /** 외부에서 ref로 open/close 제어 */
  controllerRef: React.RefObject<ReportController | null>;
  onSubmit?: (reason: ReportReason) => void;
};

/**
 * 신고 사유 선택 바텀시트.
 * 부모가 controllerRef.current.open()으로 열고 닫음.
 */
export const ReportSheet = ({ controllerRef, onSubmit }: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [selected, setSelected] = useState<ReportReason | null>(null);

  const snapPoints = useMemo(() => ["55%"], []);

  // 컨트롤러 ref 노출
  if (controllerRef && !controllerRef.current) {
    (controllerRef as any).current = {
      open: () => sheetRef.current?.expand(),
      close: () => sheetRef.current?.close(),
    };
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit?.(selected);
    setSelected(null);
    sheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.background}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.body}>
        <Text variant="title" tone="navy">
          신고 사유를 선택해주세요
        </Text>
        <Text variant="caption" tone="secondary" style={{ marginTop: 6 }}>
          신고된 글은 운영자 검토 후 처리돼요
        </Text>

        <View style={styles.list}>
          {REASONS.map((r) => {
            const active = selected === r.key;
            return (
              <PressableScale
                key={r.key}
                onPress={() => setSelected(r.key)}
                scale={0.99}
                haptic="selection"
                style={[
                  styles.row,
                  {
                    borderColor: active ? colors.mintDeep : colors.border,
                    backgroundColor: active
                      ? colors.mintSoft
                      : colors.surface,
                  },
                ]}
              >
                <View
                  style={[
                    styles.rowIcon,
                    {
                      backgroundColor: active
                        ? colors.mintDeep
                        : colors.surfaceAlt,
                    },
                  ]}
                >
                  <Feather
                    name={r.icon}
                    size={16}
                    color={active ? colors.white : colors.textSecondary}
                  />
                </View>
                <Text
                  variant="body"
                  tone={active ? "navy" : "primary"}
                  weight="bold"
                  style={{ flex: 1 }}
                >
                  {r.label}
                </Text>
                {active && (
                  <Feather name="check" size={18} color={colors.mintDeep} />
                )}
              </PressableScale>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Button
            label="신고하기"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSubmit}
            style={{ opacity: selected ? 1 : 0.4 }}
          />
        </View>
      </BottomSheetView>
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
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  list: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1.5,
    borderRadius: radius.xl,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: spacing.xl,
  },
});
