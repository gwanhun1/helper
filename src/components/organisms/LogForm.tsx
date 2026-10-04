import { useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import { apiRequest } from "../../utils/api";
import { moodLabel, moodEmoji } from "../../utils/mood";
import { formatDate } from "../../utils/date";
import ConfirmDialog from "../molecules/ConfirmDialog";
import type { Item } from "../../hooks/useContentsData";
import { toast } from "react-hot-toast";
const LogForm = ({ data, onDelete }: { data: Item; onDelete?: () => void }) => {
  const { deleteData, loading } = useDeleteData();
  const [confirm, setConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);
  const remove = async () => {
    try {
      await deleteData(data.id);
      setConfirm(false);
      onDelete?.();
      toast.success("기록을 삭제했어요");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "삭제하지 못했어요.",
      );
    }
  };
  const visibility = async () => {
    setUpdating(true);
    try {
      await apiRequest(
        "/api/records",
        { id: data.id, open: !data.open },
        "PATCH",
      );
      toast.success(data.open ? "비공개로 바꿨어요" : "커뮤니티에 공유했어요");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "설정을 바꾸지 못했어요.",
      );
    } finally {
      setUpdating(false);
    }
  };
  return (
    <article className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-white border border-slate-200 p-4">
      <div className="flex flex-wrap justify-between gap-2 text-xs text-slate-600">
        <span>
          {formatDate(data.date).date} · {formatDate(data.date).time}
        </span>
        <span>
          {moodEmoji(data.level)} {moodLabel(data.level)}
        </span>
      </div>
      <h2 className="mt-4 text-base font-semibold text-slate-800 whitespace-pre-wrap break-words">
        {data.content}
      </h2>
      <p className="mt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
        {data.response}
      </p>
      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-sm font-semibold text-slate-800">
          {data.open ? "커뮤니티 공유 중" : "나만 보기 · 비공개"}
        </p>
        <p className="mt-2 text-xs text-slate-600">
          공유하면 고민과 조언을 누구나 볼 수 있어요.
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <button
            disabled={updating || loading}
            onClick={visibility}
            className="min-h-11 text-sm text-emerald-800 underline"
          >
            {updating
              ? "설정 저장 중…"
              : data.open
                ? "비공개로 바꾸기"
                : "커뮤니티에 공유하기"}
          </button>
          <button
            disabled={updating || loading}
            onClick={() => setConfirm(true)}
            className="min-h-11 text-sm text-rose-700 underline"
          >
            기록 삭제하기
          </button>
        </div>
      </div>
      {confirm && (
        <ConfirmDialog
          title="기록을 삭제할까요?"
          description="고민과 AI 조언이 내 숲과 커뮤니티에서 삭제됩니다. 삭제하면 복구할 수 없어요."
          pending={loading}
          onClose={() => setConfirm(false)}
          onConfirm={() => void remove()}
        />
      )}
    </article>
  );
};
export default LogForm;
