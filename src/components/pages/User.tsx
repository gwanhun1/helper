import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import useUserStore from "../../store/userStore";
import { Link } from "react-router-dom";
import PageLayout from "../organisms/PageLayout";
import ProfileImage from "../atoms/ProfileImage";
import { toast } from "react-hot-toast";
const User = () => {
  const { user, accountError, refreshAccount } = useUserStore();
  useEffect(() => {
    void refreshAccount();
  }, [refreshAccount]);
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃했어요");
    } catch {
      toast.error("로그아웃하지 못했어요. 다시 시도해주세요.");
    }
  };
  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto p-5 space-y-5">
        <h1 className="text-2xl font-bold text-slate-800">내 정보</h1>
        <section className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="flex items-center gap-4">
            <ProfileImage size={64} src={user?.photoURL || undefined} />
            <div className="min-w-0">
              <p className="font-semibold text-slate-800 truncate">
                {user?.displayName || "숲지기"}
              </p>
              <p className="mt-1 text-sm text-slate-600 truncate">
                {user?.email || "카카오로 로그인 중"}
              </p>
            </div>
          </div>
        </section>
        <section className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
          <h2 className="text-base font-semibold text-slate-800">
            오늘 남은 상담
          </h2>
          <p className="mt-3 text-3xl font-bold text-emerald-800">
            {user?.count ?? "—"}
            <span className="text-sm text-slate-600 ml-2">/ 10회</span>
          </p>
          <p className="mt-3 text-sm text-slate-600">
            한국 시간 오전 0시에 다음 날 한도로 갱신돼요.
          </p>
          {accountError && (
            <p role="alert" className="mt-3 text-sm text-rose-700">
              {accountError}
            </p>
          )}
          <button
            onClick={() => void refreshAccount()}
            className="mt-3 text-sm underline text-emerald-800 min-h-11"
          >
            남은 횟수 다시 확인
          </button>
        </section>
        <div className="space-y-3">
          {[
            {
              to: "/insight",
              title: "나의 기분 리포트",
              desc: "직접 고른 기분과 기록 습관 돌아보기",
            },
            {
              to: "/worry",
              title: "나의 마음 숲",
              desc: "저장한 고민 보기 · 공개 설정 · 삭제",
            },
            {
              to: "/credit",
              title: "상담 이용 안내",
              desc: "무료 이용 횟수와 갱신 시간",
            },
            {
              to: "/guide",
              title: "이용 방법과 기록 안내",
              desc: "공개 범위와 AI에 전달하는 정보",
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block p-4 rounded-xl bg-white border border-slate-200"
            >
              <h2 className="text-base font-semibold text-slate-800">
                {item.title} →
              </h2>
              <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
        <button
          onClick={logout}
          className="min-h-11 text-sm text-slate-600 underline"
        >
          로그아웃
        </button>
      </div>
    </PageLayout>
  );
};
export default User;
