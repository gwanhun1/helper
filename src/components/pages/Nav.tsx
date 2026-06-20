import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneSmile } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import useUserStore from "../../store/userStore";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    };

    const animationInterval = setInterval(startAnimation, 4000);
    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = useUserStore((state) => state.user);

  return (
    <>
      {location.pathname !== "/credit" &&
      location.pathname !== "/auth" &&
      location.pathname !== "/meditation" &&
      location.pathname !== "/worry" ? (
        <div className="px-4 pt-6 bg-white bg-gradient-to-b">
          <div className="flex justify-between items-center pb-4">
            <p
              className="text-xl font-extrabold opacity-60 cursor-pointer select-none text-green-600 helper-text"
              onClick={() => navigate("/")}
            >
              Mind
              <span
                className={`inline-block ${
                  isAnimating ? "animate-sequence" : ""
                }`}
              >
                L
              </span>
              ift
            </p>
            <div className="relative z-20" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="p-2 bg-green-200 rounded-full backdrop-blur-sm"
              >
                <AiTwotoneSmile className="text-lg text-white hover:text-[#FFE04D] transition-colors cursor-pointer" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 animate-fadeIn">
                  <div className="bg-white rounded-[14px] shadow-[0_2px_16px_rgb(0,0,0,0.08)] p-4 relative animate-fadeIn hover:shadow-[0_4px_20px_rgb(0,0,0,0.12)] transition-shadow duration-300">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                        <span className="inline-block animate-wave">👋</span>
                        <span>{user?.displayName}님 안녕하세요!</span>
                      </div>
                      <div className="pt-2 mt-1 border-t border-gray-100 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-800 whitespace-nowrap">
                          <span className="text-[15px]">📢</span>
                          <span>
                            <span className="text-blue-500">버전 1.0.4</span>{" "}
                            업데이트 소식
                          </span>
                        </div>
                        <div className="ml-6 flex flex-col gap-1 text-[12.5px] text-gray-700 font-medium">
                          <div className="flex items-start gap-2 whitespace-nowrap">
                            <span className="mt-[1px]">🌳</span>
                            <span>포레스트가 계절·시간대에 따라 변화해요.</span>
                          </div>
                          <div className="flex items-start gap-2 whitespace-nowrap">
                            <span className="mt-[1px]">📊</span>
                            <span>’나의 마음 리포트’가 새로 추가됐어요.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-2 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white drop-shadow-sm"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes sequence {
          0% { transform: scaleX(1); }
          15% { transform: scaleX(-1); }
          30% { transform: scaleX(1); }
          45% { transform: scaleX(-1); }
          50%, 60% { transform: scaleX(1); }
          70% { transform: scaleX(1) translateY(-5px); }
          75% { transform: scaleX(1); }
          85% { transform: scaleX(1) translateY(-5px); }
          90%, 100% { transform: scaleX(1); }
        }

        .animate-sequence {
          display: inline-block;
          animation: sequence 2.5s ease-in-out;
          transform-origin: center;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(10deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
        }

        @keyframes bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Nav;
