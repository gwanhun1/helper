import Text from "../atoms/Text";

interface RemainingQuotaCardProps {
  count?: number;
  total: number;
  lastResetDate?: string;
  className?: string;
}

const RemainingQuotaCard = ({
  count = 0,
  total,
  lastResetDate,
  className = "",
}: RemainingQuotaCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.04)] px-5 py-4 ${className}`}
    >
      <Text variant="h2" weight="bold" className="mb-2">
        오늘 남은 상담 기회
      </Text>
      <div className="flex gap-2 items-baseline">
        <Text variant="h1" weight="bold">
          {count}
        </Text>
        <Text className="text-sm text-gray-500">/ {total}회</Text>
      </div>
      <Text className="mt-2 text-sm text-gray-600">
        자정 이후 다시 로그인하면 {total}회로 초기화돼요.
      </Text>
      <Text className="mt-1 text-xs text-gray-400">
        마지막 리셋 기준일: {lastResetDate || "정보 없음"}
      </Text>
    </div>
  );
};

export default RemainingQuotaCard;
