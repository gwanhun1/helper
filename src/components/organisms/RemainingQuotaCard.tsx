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
      className={`relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-7 shadow-2xl shadow-green/10 ${className}`}
    >
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green/10 rounded-full blur-3xl -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green/5 rounded-full blur-2xl -ml-12 -mb-12" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green/10 rounded-2xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" className="fill-green" />
              </svg>
            </div>
            <div>
              <Text variant="caption" weight="bold" color="tertiary" className="uppercase tracking-[0.2em] text-[9px]">
                Quota Status
              </Text>
              <Text variant="h3" weight="bold" className="text-slate-800">
                남은 상담 기회
              </Text>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-5">
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-black text-slate-800 tracking-tighter"
          >
            {count}
          </motion.span>
          <div className="flex flex-col">
            <Text variant="caption" color="secondary" weight="bold">
              회 가능
            </Text>
            <Text variant="small" color="tertiary" className="text-[10px] -mt-1">
              총 {total}회 중
            </Text>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative h-3 w-full bg-slate-200/40 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute inset-y-0 left-0 bg-green rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-1.5 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green rounded-full shadow-[0_0_5px_#7ac4a7]" />
              <Text variant="small" color="secondary" className="text-[11px] font-medium">
                매일 자정 12시에 {total}회로 자동 충전돼요.
              </Text>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <div className="w-1 h-1 bg-slate-400 rounded-full" />
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
