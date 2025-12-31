import Text from "../atoms/Text";
import { motion } from "framer-motion";

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
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`overflow-hidden relative p-7 border shadow-2xl backdrop-blur-xl bg-white/40 border-white/60 rounded-[32px] shadow-green/10 ${className}`}
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 rounded-full blur-3xl bg-green/10" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-24 h-24 rounded-full blur-2xl bg-green/5" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-gradient-to-br from-white to-green/10 text-green shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_12px_rgba(122,196,167,0.1)] border border-white/60">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"
                  className="fill-green"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text
                  variant="caption"
                  weight="bold"
                  color="tertiary"
                  className="uppercase tracking-[0.2em] text-[9px] opacity-60"
                >
                  Quota Status
                </Text>
                <span className="px-1.5 py-[1px] text-[9px] font-black rounded-full bg-green text-white shadow-sm shadow-green/20">
                  NEW
                </span>
              </div>
              <Text
                variant="h3"
                weight="bold"
                className="text-slate-800 tracking-tight"
              >
                남은 상담 기회
              </Text>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-baseline mb-5">
          <motion.span
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-black tracking-tighter text-slate-800"
          >
            {count}
          </motion.span>
          <div className="flex flex-col">
            <Text variant="caption" color="secondary" weight="bold">
              회 가능
            </Text>
            <Text
              variant="small"
              color="tertiary"
              className="text-[10px] -mt-1"
            >
              총 {total}회 중
            </Text>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden relative w-full h-3 rounded-full bg-slate-200/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute inset-y-0 left-0 rounded-full bg-green"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/30 animate-shimmer" />
            </motion.div>
          </div>

          <div className="flex flex-col gap-1.5 pt-2">
            <div className="flex gap-2 items-center">
              <div className="w-1 h-1 bg-green rounded-full shadow-[0_0_5px_#7ac4a7]" />
              <Text
                variant="small"
                color="secondary"
                className="text-[11px] font-medium"
              >
                매일 자정 12시에 {total}회로 자동 충전돼요.
              </Text>
            </div>
            <div className="flex gap-2 items-center opacity-60">
              <div className="w-1 h-1 rounded-full bg-slate-400" />
              <Text variant="small" color="tertiary" className="text-[10px]">
                최근 갱신일: {lastResetDate || "데이터 불러오는 중"}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RemainingQuotaCard;
