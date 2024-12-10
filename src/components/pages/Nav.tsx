import { useLocation } from "react-router-dom";
import { AiTwotoneSmile } from "react-icons/ai";
const Nav = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <>
      {location.pathname !== "/credit" &&
      location.pathname !== "/auth" &&
      location.pathname !== "/meditation" ? (
        <div className="mt-8  px-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-green">HELPER</p>
            <div className="p-4">
              <AiTwotoneSmile />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Nav;
