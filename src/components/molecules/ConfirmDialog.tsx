import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
interface Props {
  title: string;
  description: string;
  confirmLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
const ConfirmDialog = ({
  title,
  description,
  confirmLabel = "삭제",
  pending = false,
  onConfirm,
  onClose,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previous?.focus();
    };
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      onCancel={(event) => {
        event.preventDefault();
        if (!pending) closeRef.current();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !pending) onClose();
      }}
      className="rounded-2xl p-0 w-[calc(100%_-_32px)] max-w-sm backdrop:bg-black/40"
    >
      <div className="p-6">
        <h2 id="confirm-title" className="text-lg font-bold text-slate-800">
          {title}
        </h2>
        <p
          id="confirm-description"
          className="mt-2 text-sm text-slate-600 leading-relaxed"
        >
          {description}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            autoFocus
            disabled={pending}
            onClick={onClose}
            className="flex-1 rounded-xl bg-slate-100 py-3 font-semibold text-slate-700"
          >
            취소
          </button>
          <button
            disabled={pending}
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-rose-700 py-3 font-semibold text-white disabled:opacity-50"
          >
            {pending ? "처리 중…" : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};
export default ConfirmDialog;
