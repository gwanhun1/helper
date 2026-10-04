import React, { RefObject, MutableRefObject } from "react";

interface VentInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: RefObject<HTMLInputElement>;
  isComposingRef: MutableRefObject<boolean>;
}

const VentInput = ({
  inputValue,
  setInputValue,
  onSubmit,
  inputRef,
  isComposingRef,
}: VentInputProps) => {
  return (
    <div className="relative z-30 w-full px-4 py-4 bg-white/90 backdrop-blur border-t border-green-100 shadow-[0_-12px_40px_rgba(0,0,0,0.08)]">
      <form
        className="mx-auto flex max-w-md flex-col gap-3 rounded-3xl border border-green-100/70 bg-white/80 p-4 shadow-[0_12px_25px_rgba(76,175,80,0.12)]"
        onSubmit={onSubmit}
      >
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
          <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-black tracking-[0.3em] text-green-700">
            비밀
          </span>
          마음속 이야기를 놓아주세요
        </div>
        <div className="flex gap-3 items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onCompositionStart={() => {
              isComposingRef.current = true;
            }}
            onCompositionEnd={() => {
              isComposingRef.current = false;
            }}
            aria-label="풀고 싶은 마음"
            placeholder="지금 마음을 편하게 적어요"
            maxLength={500}
            className="min-w-0 flex-1 rounded-full border border-green-200/70 bg-white/70 px-4 py-2 text-base font-medium text-slate-700 placeholder:text-slate-400 focus:border-green-300 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="rounded-full bg-emerald-700 disabled:opacity-50 min-h-11 shrink-0 px-4 py-2 text-[14px] font-black text-white shadow-[0_10px_24px_rgba(76,175,80,0.35)] transition hover:bg-green-600 active:scale-[0.98]"
          >
            외치기
          </button>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-600">
          <span className="px-3 py-1 bg-green-50 rounded-full border border-green-100/80">
            욕/비속어 OK
          </span>
          <span className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50">
            저장·기록 안 함
          </span>
          <span className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50">
            AI 분석 없음
          </span>
        </div>
      </form>
    </div>
  );
};

export default VentInput;
