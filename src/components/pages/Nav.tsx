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
              <span className={`inline-block ${isAnimating ? 'animate-sequence' : ''}`}>e</span>
              ntor
            </p>
            <div className="p-4">
              <AiTwotoneSmile />
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
