import { Link } from "react-router-dom";
import { FiInfo, FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../../store/userStore";
const Nav = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header className="shrink-0 flex items-center justify-between px-5 py-3 bg-white border-b border-slate-100">
      <Link
        to="/"
        aria-label="WorryHelper 홈"
        className="helper-text text-xl font-bold text-emerald-800"
      >
        WorryHelper
        <span className="hidden md:inline ml-3 text-sm font-normal text-slate-500 font-sans">
          나만의 마음 숲
        </span>
      </Link>
      <div className="relative z-40" ref={ref}>
        <button
          ref={buttonRef}
          aria-label={open ? "서비스 안내 닫기" : "서비스 안내 열기"}
          aria-expanded={open}
          aria-controls="service-info"
          onClick={() => setOpen((value) => !value)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-800"
        >
          {open ? <FiX size={20} /> : <FiInfo size={20} />}
        </button>
        {open && (
          <div
            id="service-info"
            className="absolute right-0 mt-2 w-[min(300px,calc(100vw-40px))] rounded-2xl bg-white border border-slate-200 shadow-xl p-5"
          >
            <p className="text-sm font-bold text-slate-800">
              {user?.displayName
                ? `${user.displayName}님, 안녕하세요`
                : "마음의 숲에 오신 것을 환영해요"}
            </p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              기록은 기본 비공개예요. 직접 고른 기분을 돌아보고, 원할 때만
              고민을 나눌 수 있어요.
            </p>
            <Link
              to="/guide"
              onClick={() => setOpen(false)}
              className="block mt-4 text-sm text-emerald-800 underline"
            >
              이용 방법과 기록 안내
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Nav;
