import useUserContents from "../../hooks/useUserContents";
import useSelectTreeStore from "../../store/selectTreeStore";
import LogForm from "./LogForm";
import { motion, AnimatePresence } from "framer-motion";

const ForestLog = () => {
  const { userContents: forestData, refreshUserContents: refreshData } = useUserContents();
  const { content: selectedContent, response: selectedResponse } =
    useSelectTreeStore();

  if (!forestData || !Array.isArray(forestData)) {
    return null;
  }

  const selectedItem = forestData.find(
    (item) =>
      item.content === selectedContent && item.response === selectedResponse
  );

  const hasItems = forestData.length > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-transparent py-2">
      <AnimatePresence mode="wait">
        {hasItems && selectedItem ? (
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col flex-1 min-h-0"
          >
            <LogForm
              data={selectedItem}
              onDelete={refreshData}
            />
          </motion.div>
        ) : hasItems ? (
          <motion.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-8 gap-3 select-none"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl"
            >
              🌳
            </motion.span>
            <p className="text-sm font-semibold text-slate-500 text-center">
              나무를 눌러 기록을 확인해보세요
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-8 gap-3 select-none"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl"
            >
              🌱
            </motion.span>
            <p className="text-sm font-semibold text-slate-500 text-center">
              아직 심은 고민이 없어요
            </p>
            <p className="text-xs text-slate-400 text-center">
              아래 버튼을 눌러 첫 번째 나무를 심어보세요
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForestLog;
