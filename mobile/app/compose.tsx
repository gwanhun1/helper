import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@/App";

import {
  Avatar,
  Badge,
  Button,
  CategoryChip,
  PressableScale,
  StepDots,
  Text,
  Toggle,
} from "@/components";
import type { WorryCategory } from "@/data";
import { colors, fontSize, radius, shadow, spacing } from "@/theme";
import { generateNickname } from "@/utils/nickname";

const CATEGORIES: { label: WorryCategory; emoji: string }[] = [
  { label: "관계", emoji: "💌" },
  { label: "일", emoji: "💼" },
  { label: "마음", emoji: "🌙" },
  { label: "일상", emoji: "🍃" },
];

const MAX_BODY_LEN = 300;

export default function ComposeModal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<WorryCategory | null>(null);
  const [body, setBody] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [useAi, setUseAi] = useState(false);

  // 작성 모달이 마운트될 때 한 번 닉네임 생성
  const nickname = useMemo(() => generateNickname(), []);

  const handleClose = () => navigation.goBack();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else handleClose();
  };

  const handleSubmit = () => {
    // TODO: 실제 저장 — 지금은 보상 화면으로 이동
    navigation.replace("Reward", { type: "post" });
  };

  const canProceed =
    (step === 1 && category !== null) ||
    (step === 2 && body.trim().length > 0) ||
    step === 3;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <PressableScale
          onPress={handleBack}
          haptic="selection"
          style={styles.iconBtn}
        >
          <Feather
            name={step === 1 ? "x" : "chevron-left"}
            size={22}
            color={colors.textPrimary}
          />
        </PressableScale>
        <StepDots total={3} current={step} />
        <View style={styles.iconBtn} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && (
            <StepOne category={category} onSelect={setCategory} />
          )}
          {step === 2 && (
            <StepTwo
              nickname={nickname}
              category={category}
              body={body}
              onChangeBody={setBody}
            />
          )}
          {step === 3 && (
            <StepThree
              isPublic={isPublic}
              onChangePublic={setIsPublic}
              useAi={useAi}
              onChangeAi={setUseAi}
            />
          )}
        </ScrollView>

        {/* 하단 액션 */}
        <View style={styles.footer}>
          <Button
            label={step === 3 ? "마음 띄우기" : "다음"}
            onPress={handleNext}
            variant="primary"
            size="lg"
            icon={step === 3 ? "send" : undefined}
            fullWidth
            style={{ opacity: canProceed ? 1 : 0.4 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ===================== Step 1 — 카테고리 선택 =====================

const StepOne = ({
  category,
  onSelect,
}: {
  category: WorryCategory | null;
  onSelect: (c: WorryCategory) => void;
}) => (
  <View style={styles.stepWrap}>
    <Text variant="eyebrow" tone="mintDeep">
      STEP 1
    </Text>
    <Text variant="title" tone="navy" style={{ marginTop: 6 }}>
      어떤 마음인가요?
    </Text>
    <Text variant="caption" tone="secondary" style={{ marginTop: 6 }}>
      가장 가까운 카테고리를 골라주세요
    </Text>

    <View style={styles.chipGrid}>
      {CATEGORIES.map((c) => (
        <CategoryChip
          key={c.label}
          label={c.label}
          emoji={c.emoji}
          selected={category === c.label}
          onPress={() => onSelect(c.label)}
        />
      ))}
    </View>
  </View>
);

// ===================== Step 2 — 본문 작성 =====================

const StepTwo = ({
  nickname,
  category,
  body,
  onChangeBody,
}: {
  nickname: string;
  category: WorryCategory | null;
  body: string;
  onChangeBody: (v: string) => void;
}) => (
  <View style={styles.stepWrap}>
    <Text variant="eyebrow" tone="mintDeep">
      STEP 2
    </Text>
    <Text variant="title" tone="navy" style={{ marginTop: 6 }}>
      마음을 적어주세요
    </Text>
    <Text variant="caption" tone="secondary" style={{ marginTop: 6 }}>
      누군가 따뜻한 답장을 보내올 거예요
    </Text>

    {/* 작성자 카드 */}
    <View style={styles.authorRow}>
      <Avatar icon="moon" variant="mint" size="md" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="subtitle" tone="navy">
          {nickname}
        </Text>
        <Text variant="caption" tone="tertiary">
          익명 닉네임 · 이번 글에만 사용돼요
        </Text>
      </View>
      {category && <Badge label={category} variant="soft" />}
    </View>

    {/* 입력 영역 */}
    <View style={styles.textareaWrap}>
      <TextInput
        value={body}
        onChangeText={(v) => onChangeBody(v.slice(0, MAX_BODY_LEN))}
        placeholder="오늘 마음에 떠있는 이야기를 들려주세요"
        placeholderTextColor={colors.textPlaceholder}
        multiline
        style={styles.textarea}
      />
      <Text variant="caption" tone="tertiary" style={styles.counter}>
        {body.length} / {MAX_BODY_LEN}
      </Text>
    </View>
  </View>
);

// ===================== Step 3 — 공개 설정 =====================

const StepThree = ({
  isPublic,
  onChangePublic,
  useAi,
  onChangeAi,
}: {
  isPublic: boolean;
  onChangePublic: (v: boolean) => void;
  useAi: boolean;
  onChangeAi: (v: boolean) => void;
}) => (
  <View style={styles.stepWrap}>
    <Text variant="eyebrow" tone="mintDeep">
      STEP 3
    </Text>
    <Text variant="title" tone="navy" style={{ marginTop: 6 }}>
      어디까지 닿게 할까요?
    </Text>
    <Text variant="caption" tone="secondary" style={{ marginTop: 6 }}>
      마음을 받을 사람의 범위를 정해주세요
    </Text>

    {/* 공개 반경 안내 */}
    <View style={styles.settingCard}>
      <View style={styles.settingRow}>
        <View style={styles.settingIcon}>
          <Feather name="map-pin" size={18} color={colors.mintDeep} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="body" tone="navy" weight="bold">
            근처 반경에 띄우기
          </Text>
          <Text variant="caption" tone="secondary">
            {isPublic
              ? "반경 약 3km 안 사람들에게 보여요"
              : "나만 보는 일기로 저장돼요"}
          </Text>
        </View>
        <Toggle value={isPublic} onChange={onChangePublic} />
      </View>
      <View style={styles.divider} />
      <View style={styles.settingRow}>
        <View style={styles.settingIcon}>
          <Feather name="cpu" size={18} color={colors.mintDeep} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="body" tone="navy" weight="bold">
            AI 도우미에게도 답 받기
          </Text>
          <Text variant="caption" tone="secondary">
            {useAi ? "사람 + AI 두 가지 답장을 받아요" : "사람 답장만 받아요"}
          </Text>
        </View>
        <Toggle value={useAi} onChange={onChangeAi} />
      </View>
    </View>

    {/* 위치 정밀도 안내 */}
    <View style={styles.privacyBanner}>
      <Feather name="shield" size={14} color={colors.mintDeep} />
      <Text
        variant="caption"
        tone="secondary"
        style={{ flex: 1, lineHeight: 18 }}
      >
        정확한 위치는 가려져요. 안심하고 띄워보세요
      </Text>
    </View>
  </View>
);

// ===================== 스타일 =====================

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
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingHorizontal: spacing["2xl"],
    paddingTop: spacing.lg,
    paddingBottom: spacing["3xl"],
  },
  stepWrap: {
    gap: 0,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  textareaWrap: {
    backgroundColor: colors.surface,
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: 200,
    ...shadow.subtle,
  },
  textarea: {
    flex: 1,
    minHeight: 140,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    lineHeight: 24,
    textAlignVertical: "top",
  },
  counter: {
    alignSelf: "flex-end",
    marginTop: spacing.sm,
  },

  settingCard: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.subtle,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.lg + 36 + spacing.md,
  },

  privacyBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.mintSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    marginTop: spacing.lg,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
