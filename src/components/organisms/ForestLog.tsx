import useUserContents from "../../hooks/useUserContents";
import useSelectTreeStore from "../../store/selectTreeStore";
import LogForm from "./LogForm";
import { BsArrowUpCircle } from "react-icons/bs";
import { motion } from "framer-motion";

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

  return (
    <div className="h-full flex flex-col min-h-0 bg-transparent">
      {forestData && forestData.length > 0 ? (
        <>
          {selectedItem ? (
            <div className="h-full min-h-0 overflow-auto">
              <LogForm
                key={selectedItem.id}
                data={selectedItem}
                onDelete={refreshData}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center text-slate-500 select-none pb-8"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-4 relative"
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-emerald-200 blur-lg"
                />
                <BsArrowUpCircle className="w-12 h-12 text-emerald-500 relative z-10" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/40 backdrop-blur-sm px-8 py-5 rounded-[24px] border border-white/60 shadow-lg"
              >
                <p className="text-base font-bold text-slate-700 text-center">
                  위의 나무를 선택해주세요
                </p>
                <p className="text-xs text-slate-400 text-center mt-2 leading-relaxed font-medium">
                  당신의 소중한 생각이 기록된 <br />
                  나무를 확인할 수 있어요
                </p>
              </motion.div>
            </motion.div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default ForestLog;
