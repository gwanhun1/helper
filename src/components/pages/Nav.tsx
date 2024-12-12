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
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between">
            <p
              className="text-xl font-bold text-white helper-text"
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
            <div className="p-4 relative group z-20">
              <AiTwotoneSmile className="text-xl hover:text-yellow-400 transition-colors" />
              <div className="absolute right-0 mt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white rounded-lg shadow-lg p-3 relative">
                  <div className="text-gray-800 whitespace-nowrap">
                    버전 1.0.0 이 출시되었습니다! 🎉🎊
                  </div>
                  <div className="absolute -top-2 right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white"></div>
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
