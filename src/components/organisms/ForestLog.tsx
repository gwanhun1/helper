import useUserContents from "../../hooks/useUserContents";
import useSelectTreeStore from "../../store/selectTreeStore";
import LogForm from "./LogForm";
import { formatDate } from "../../utils/date";
const ForestLog = () => {
  const {
    userContents: records,
    loading,
    error,
    refreshUserContents,
  } = useUserContents();
  const selected = useSelectTreeStore();
  const record = records.find((item) => item.id === selected.id);
  if (loading)
    return (
      <p role="status" className="p-4 text-sm text-slate-600">
        기록을 불러오고 있어요
      </p>
    );
  if (error)
    return (
      <div role="alert" className="p-4 text-sm text-rose-700">
        {error}
        <button
          onClick={() => void refreshUserContents()}
          className="block underline mt-2"
        >
          다시 불러오기
        </button>
      </div>
    );
  if (record)
    return (
      <div className="space-y-3">
        <button
          onClick={() => selected.reset()}
          className="min-h-11 text-sm underline text-emerald-800"
        >
          기록 목록으로 돌아가기
        </button>
        <LogForm data={record} onDelete={() => selected.reset()} />
      </div>
    );
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-800">
        나의 기록 · {records.length}개
      </h2>
      {records.length ? (
        <div className="space-y-2 mt-3">
          {[...records].reverse().map((item) => (
            <button
              key={item.id}
              onClick={() => selected.select(item)}
              className="w-full text-left rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="text-xs text-slate-600">
                {formatDate(item.date).date} ·{" "}
                {item.open ? "공유 중" : "비공개"}
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-2 line-clamp-2 break-words">
                {item.content}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 p-5 mt-3 text-center">
          <p className="text-sm font-semibold text-slate-800">
            아직 기록이 없어요
          </p>
          <p className="text-sm text-slate-600 mt-2">
            첫 마음을 기록하면 나무가 자라요.
          </p>
        </div>
      )}
    </section>
  );
};
export default ForestLog;
