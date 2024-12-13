import useLogsData from "../../hooks/useLogsData";
import useSelectTreeStore from "../../store/selectTreeStore";
import LogForm from "./LogForm";
import { BsArrowUpCircle } from "react-icons/bs";
import { motion } from "framer-motion";

const ForestLog = () => {
  const { logsData: forestData, refreshData } = useLogsData();
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
    <>
      {forestData && forestData.length > 0 ? (
        <>
          {selectedItem ? (
            <div className="divide-y divide-gray-100 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <LogForm
                key={selectedItem.id}
                data={selectedItem}
                onDelete={refreshData}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-slate-500 select-none py-8 sm:pt-12 sm:pb-2"
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
                className="mb-2 sm:mb-6 relative"
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
                <BsArrowUpCircle className="w-10 h-10 sm:w-14 sm:h-14 text-emerald-500 relative z-10" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-gradient-to-b from-slate-50 to-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-md max-w-[85%] sm:max-w-none"
              >
                <p className="text-base sm:text-lg font-medium text-slate-700 text-center">
                  위의 나무를 선택해주세요
                </p>
                <p className="text-xs sm:text-sm text-slate-400 text-center mt-1.5 sm:mt-2 leading-relaxed">
                  당신의 소중한 생각이 기록된
                  <br />
                  나무를 확인할 수 있어요
                </p>
              </motion.div>
            </motion.div>
          )}
        </>
      ) : null}
    </>
  );
};

export default ForestLog;
