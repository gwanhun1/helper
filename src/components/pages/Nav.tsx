import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneSmile } from "react-icons/ai";
import { useEffect, useState } from "react";

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

  return (
    <>
      {location.pathname !== "/credit" &&
      location.pathname !== "/auth" &&
      location.pathname !== "/meditation" ? (
        <div className="pt-6 px-4 bg-gradient-to-b bg-green-700">
          <div className="flex items-center justify-between pb-4">
            <p
              className="text-xl font-extrabold text-white helper-text cursor-pointer select-none"
              onClick={() => navigate("/")}
            >
              MoodM
              <span
                className={`inline-block ${
                  isAnimating ? "animate-sequence" : ""
                }`}
              >
                e
              </span>
              ntor
            </p>
            <div className="relative group z-20">
              <div className="p-2 bg-green-800 backdrop-blur-sm rounded-full">
                <AiTwotoneSmile className="text-lg text-white hover:text-[#FFE04D] transition-colors" />
              </div>
              <div className="absolute right-0 mt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white rounded-[14px] shadow-[0_2px_16px_rgb(0,0,0,0.08)] p-3 relative">
                  <div className="text-[13px] font-medium text-gray-800 whitespace-nowrap">
                    버전 1.0.0 이 출시되었습니다! 🎉🎊
                  </div>
                  <div className="absolute -top-2 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white"></div>
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
      `}</style>
    </>
  );
};

export default Nav;
