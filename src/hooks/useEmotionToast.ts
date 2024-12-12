import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ReactNode } from "react";

interface ForestDataItem {
  level?: number;
  createdAt?: string;
  id?: string;
  [key: string]: any;
}

type EmotionType = "HIGH" | "MEDIUM" | "LOW";

interface EmotionMessage {
  title: string;
  description: string;
  icon: string;
}

const EMOTION_MESSAGES: Record<EmotionType, EmotionMessage> = {
  HIGH: {
    title: "힘든 시간을 보내고 계시네요 😔",
    description: "고민을 글로 적어보면 마음이 한결 가벼워질 수 있어요",
    icon: "🌱",
  },
  MEDIUM: {
    title: "평온한 하루를 보내고 계시네요 😊",
    description: "잠시 명상을 하며 마음을 돌아보는 건 어떨까요?",
    icon: "🍃",
  },
  LOW: {
    title: "기분 좋은 하루네요! 💫",
    description: "오늘의 긍정적인 순간들을 기록해보세요",
    icon: "✨",
  },
} as const;

const getEmotionLevel = (level: number): EmotionType => {
  if (level >= 6) return "HIGH";
  if (level >= 3) return "MEDIUM";
  return "LOW";
};

const getEmotionMessage = (level: number): EmotionMessage => {
  const emotionType = getEmotionLevel(level);
  return EMOTION_MESSAGES[emotionType];
};

const ToastContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): ReactNode => (
  <div className="flex flex-col gap-1">
    <span className="font-medium">{title}</span>
    <span className="text-sm">{description}</span>
  </div>
);

export const useEmotionToast = (
  forestData: ForestDataItem[] | undefined
): void => {
  useEffect(() => {
    if (!forestData || forestData.length === 0) return;

    const lastRecord = forestData[forestData.length - 1];
    if (!lastRecord || lastRecord.level === undefined) return;

    const level = Number(lastRecord.level);
    const message = getEmotionMessage(level);

    toast(
      <ToastContent title={message.title} description={message.description} />,
      { icon: message.icon, duration: 5000 }
    );
  }, [forestData]);
};
