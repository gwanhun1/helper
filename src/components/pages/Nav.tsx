import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneSmile } from "react-icons/ai";
import { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    };

    const animationInterval = setInterval(startAnimation, 4000);
    return () => clearInterval(animationInterval);
  }, []);

  const user = useUserStore((state) => state.user);

  return (
    <>
      {location.pathname !== "/credit" &&
      location.pathname !== "/auth" &&
      location.pathname !== "/meditation" ? (
        <div className="pt-6 px-4  bg-gradient-to-b bg-white">
          <div className="flex items-center justify-between pb-4">
            <p
              className="opacity-60 text-xl font-extrabold text-green helper-text cursor-pointer select-none"
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
            <div className="relative group z-20">
              <div className="p-2 bg-green-200 backdrop-blur-sm rounded-full">
                <AiTwotoneSmile className="text-lg text-white hover:text-[#FFE04D] transition-colors cursor-pointer" />
              </div>
              <div className="absolute right-0 mt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white rounded-[14px] shadow-[0_2px_16px_rgb(0,0,0,0.08)] p-4 relative animate-fadeIn hover:shadow-[0_4px_20px_rgb(0,0,0,0.12)] transition-shadow duration-300">
                  <div className="flex flex-col gap-2">
                    <div className="text-[14px] font-semibold text-gray-800 whitespace-nowrap flex items-center gap-2">
                      <span className="animate-wave inline-block">👋</span>{" "}
                      {user?.displayName}님 안녕하세요!
                    </div>
                    <div className="text-[14px] font-medium text-gray-800 whitespace-nowrap flex items-center gap-1">
                      🎉<span className="text-blue-500">버전 1.0.2</span> 이
                      출시되었습니다! 🎊
                    </div>
                  </div>
                  <div className="absolute -top-2 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white drop-shadow-sm"></div>
                </div>
              </div>
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
