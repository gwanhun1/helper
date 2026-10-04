import { NavLink } from "react-router-dom";
import { FiHome, FiMessageCircle, FiUser, FiWind } from "react-icons/fi";
import { RiPlantLine } from "react-icons/ri";
const tabs = [
  { to: "/", label: "홈", icon: FiHome },
  { to: "/advice", label: "고민 나눔", icon: FiMessageCircle },
  { to: "/worry", label: "마음의 숲", icon: RiPlantLine },
  { to: "/vent", label: "감정 풀기", icon: FiWind },
  { to: "/user", label: "내 정보", icon: FiUser },
];
const BottomNavigation = () => (
  <nav
    aria-label="주요 메뉴"
    className="flex md:flex-col md:gap-2 md:p-3 md:h-full justify-between bg-white border-t md:border-t-0 md:border-r border-slate-200 pb-safe"
  >
    {tabs.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `flex flex-1 md:flex-none flex-col md:flex-row md:gap-3 items-center justify-center md:justify-start min-h-[64px] md:min-h-12 px-1 md:px-3 py-2 md:rounded-xl transition-colors ${isActive ? "text-emerald-800 bg-emerald-50 font-semibold" : "text-slate-600 hover:bg-slate-50"}`
        }
      >
        <Icon size={21} aria-hidden="true" />
        <span className="text-[11px] md:text-sm mt-1 md:mt-0 whitespace-nowrap">
          {label}
        </span>
      </NavLink>
    ))}
    <p className="hidden md:block mt-auto px-3 py-3 text-xs text-slate-500 leading-relaxed">
      마음은 천천히
      <br />
      돌봐도 괜찮아요.
    </p>
  </nav>
);
export default BottomNavigation;
