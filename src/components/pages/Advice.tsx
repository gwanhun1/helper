import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "../organisms/PageLayout";
import CommentList from "../organisms/CommentList";
import useUserStore from "../../store/userStore";
import useContentsData from "../../hooks/useContentsData";
import useLikeManager from "../../hooks/useLikeManager";
import useCommentManager from "../../hooks/useCommentManager";
import useDeleteData from "../../hooks/useDeleteData";
import ConfirmDialog from "../molecules/ConfirmDialog";
import { worryCategories } from "../../constants/records";
import { toast } from "react-hot-toast";
import { formatRelativeDate } from "../../utils/date";
const Advice = () => {
  const { data: records, loading, error, refreshData } = useContentsData();
  const [params, setParams] = useSearchParams();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const {
    togglePostLike,
    toggleCommentLike,
    loading: liking,
  } = useLikeManager();
  const {
    addComment,
    deleteComment,
    loading: commenting,
  } = useCommentManager();
  const { deleteData, loading: deleting } = useDeleteData();
  const [newComment, setNewComment] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("전체");
  const [confirm, setConfirm] = useState(false);
  const current = records.find((record) => record.id === params.get("post"));
  const filtered = records.filter(
    (record) =>
      (category === "전체" || record.category === category) &&
      `${record.content} ${record.response}`
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
  );
  const busy = liking || commenting || deleting;
  const run = async (action: () => Promise<unknown>) => {
    try {
      await action();
    } catch (cause) {
      toast.error(
        cause instanceof Error ? cause.message : "처리하지 못했어요.",
      );
    }
  };
  const closeDetail = () => {
    setParams({});
    setNewComment("");
  };
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto p-5 pb-8 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">고민 나눔</h1>
          <p className="text-sm text-slate-600 mt-2">
            공유를 선택한 고민만 보여요. 서로에게 따뜻한 응원을 건네요.
          </p>
        </div>
        {error ? (
          <div
            role="alert"
            className="p-5 rounded-xl bg-rose-50 text-rose-700 text-sm"
          >
            {error}
            <button
              onClick={() => void refreshData()}
              className="block mt-3 underline"
            >
              다시 불러오기
            </button>
          </div>
        ) : loading ? (
          <p role="status" className="text-sm text-slate-600">
            고민을 불러오고 있어요
          </p>
        ) : current ? (
          <>
            <button
              onClick={closeDetail}
              className="min-h-11 text-sm text-emerald-800 underline"
            >
              고민 목록으로 돌아가기
            </button>
            <article className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="flex flex-wrap gap-2 items-center text-xs text-slate-600">
                <span>{current.category || "마음"}</span>
                <span>·</span>
                <span>{formatRelativeDate(current.date)}</span>
                {user?.uid === current.userId && (
                  <span className="text-emerald-800 font-semibold">
                    · 내가 공유한 글
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-800 whitespace-pre-wrap break-words">
                {current.content}
              </h2>
              {user?.uid === current.userId && (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => setConfirm(true)}
                    className="text-sm text-rose-700 underline min-h-11"
                  >
                    고민 삭제하기
                  </button>
                  <button
                    onClick={() => navigate("/worry")}
                    className="text-sm text-emerald-800 underline min-h-11"
                  >
                    내 숲에서 공개 설정하기
                  </button>
                </div>
              )}
            </article>
            <CommentList
              mainContent={current}
              comments={current.comments || []}
              isLoggedIn={Boolean(user)}
              isPostLiked={Boolean(user && current.likedBy?.includes(user.uid))}
              commentLikeStates={Object.fromEntries(
                (current.comments || []).map((comment) => [
                  comment.id!,
                  Boolean(user && comment.likedBy?.includes(user.uid)),
                ]),
              )}
              currentUserId={user?.uid}
              onTogglePostLike={() =>
                void run(() => togglePostLike(current.id))
              }
              onToggleCommentLike={(id) =>
                void run(() => toggleCommentLike(current.id, id))
              }
              onDeleteComment={(id) =>
                void run(() => deleteComment(current.id, id))
              }
              newComment={newComment}
              onCommentChange={setNewComment}
              onCommentSubmit={(event) => {
                event.preventDefault();
                void run(async () => {
                  await addComment(current.id, newComment);
                  setNewComment("");
                  toast.success("응원을 남겼어요");
                });
              }}
              isLoading={busy}
              formatDate={formatRelativeDate}
            />
            {confirm && (
              <ConfirmDialog
                title="고민을 삭제할까요?"
                description="내 숲의 기록과 커뮤니티의 고민·댓글이 삭제됩니다. 삭제하면 복구할 수 없어요."
                pending={deleting}
                onClose={() => setConfirm(false)}
                onConfirm={() =>
                  void run(async () => {
                    await deleteData(current.id);
                    setConfirm(false);
                    closeDetail();
                    toast.success("기록을 삭제했어요");
                  })
                }
              />
            )}
          </>
        ) : (
          <>
            {params.get("post") && (
              <p
                role="status"
                className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800"
              >
                이 고민은 삭제되었거나 비공개로 바뀌었어요.
              </p>
            )}
            <button
              onClick={() => navigate("/worry?compose=1")}
              className="w-full rounded-xl bg-emerald-700 text-white font-semibold py-3.5"
            >
              내 마음 기록하기
            </button>
            <div>
              <label
                htmlFor="community-search"
                className="text-sm font-semibold text-slate-700"
              >
                공유된 고민 찾기
              </label>
              <input
                id="community-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="고민이나 조언에서 검색"
                className="mt-2 w-full bg-white border border-slate-200 rounded-xl p-3 text-base"
              />
            </div>
            <div
              role="group"
              aria-label="고민 분야"
              className="flex flex-wrap gap-2"
            >
              {["전체", ...worryCategories].map((value) => (
                <button
                  key={value}
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                  className={`px-3 min-h-11 rounded-full border text-sm ${category === value ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-slate-600 border-slate-200"}`}
                >
                  {value}
                </button>
              ))}
            </div>
            <p role="status" className="text-xs text-slate-600">
              최근 공유된 고민 최대 100개 중 {filtered.length}개
            </p>
            {filtered.length ? (
              <div className="space-y-3">
                {filtered.map((record) => (
                  <button
                    key={record.id}
                    onClick={() => {
                      setParams({ post: record.id });
                      setNewComment("");
                    }}
                    className="block w-full text-left rounded-2xl bg-white border border-slate-200 p-5 hover:border-emerald-300"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span>{record.category || "마음"}</span>
                      <span>· {formatRelativeDate(record.date)}</span>
                    </div>
                    <h2 className="mt-3 text-base font-semibold text-slate-800 line-clamp-3 break-words">
                      {record.content}
                    </h2>
                    <p className="text-xs text-slate-600 mt-4">
                      응원 {record.like || 0} · 댓글{" "}
                      {record.comments?.length || 0}
                      <span className="float-right text-emerald-800">
                        자세히 보기 →
                      </span>
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <section className="text-center rounded-2xl bg-white border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-800">
                  {search || category !== "전체"
                    ? "조건에 맞는 고민이 없어요"
                    : "아직 공유된 고민이 없어요"}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {search || category !== "전체"
                    ? "검색어와 분야를 바꿔보세요."
                    : "마음을 기록하고 원할 때만 나눠보세요."}
                </p>
                {(search || category !== "전체") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("전체");
                    }}
                    className="mt-4 text-sm text-emerald-800 underline min-h-11"
                  >
                    검색 조건 초기화
                  </button>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};
export default Advice;
