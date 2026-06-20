import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import Accordion from "../molecules/Accordion";
import { useState, useEffect, useRef } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import { useSwipeable } from "react-swipeable";
import { Item } from "../../hooks/useContentsData";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface LogFormProps {
  data: Item;
  onDelete?: () => void;
}

const LogForm = ({ data, onDelete }: LogFormProps) => {
  const { deleteData, loading } = useDeleteData();
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  useEffect(() => {
    return () => { cleanupRef.current?.(); };
  }, []);

  const handleDeleteConfirmed = async () => {
    try {
      await deleteData(data.id);
      setShowDeleteConfirm(false);
      if (onDelete) await onDelete();
    } catch {
      toast.error("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSwipedItemId(null);
    setShowDeleteConfirm(true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setSwipedItemId(data.id),
    onSwipedRight: () => setSwipedItemId(null),
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diffX = startX - moveEvent.clientX;
      if (diffX > 50) {
        setSwipedItemId(data.id);
        cleanup();
      } else if (diffX < -50) {
        setSwipedItemId(null);
        cleanup();
      }
    };

    const handleMouseUp = () => cleanup();

    const cleanup = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    cleanupRef.current = cleanup;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {/* 인앱 삭제 확인 모달 */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/20 pb-6"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl mx-4 p-5 w-full max-w-sm shadow-xl"
            >
              <p className="text-base font-bold text-slate-800 mb-1">기록을 삭제할까요?</p>
              <p className="text-sm text-slate-400 mb-5">삭제하면 복구할 수 없어요.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold text-sm disabled:opacity-60"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        {...swipeHandlers}
        onMouseDown={handleMouseDown}
        className={`flex flex-col flex-1 min-h-0 relative transition-all duration-300 ${
          swipedItemId === data.id ? "translate-x-[-80px]" : ""
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0 px-3 pt-1 pb-2">
          <div className="flex flex-col flex-1 min-h-0 gap-1.5">
            <div className="flex gap-3 justify-between items-center shrink-0">
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-100">
                  <AiOutlineUser className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                  Thought Fragment
                </span>
              </div>
              <button
                onClick={handleDeleteClick}
                disabled={loading}
                className="p-2 text-gray-400 rounded-lg transition-colors hover:text-rose-500 bg-slate-50"
                title="삭제하기"
              >
                <AiOutlineDelete size={18} />
              </button>
            </div>
            <div className="flex flex-col flex-1 min-h-0">
              <Accordion title={data.content} content={data.response} />
            </div>
          </div>
        </div>

        {swipedItemId === data.id && (
          <button
            onClick={handleDeleteClick}
            disabled={loading}
            className="absolute right-[-80px] top-0 bottom-0 w-[80px] bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center"
          >
            <AiOutlineDelete className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </>
  );
};

export default LogForm;
