import { Outlet } from "react-router-dom";
import "./index.css";
import BottomNavigation from "./components/molecules/BottomNavigation";
import Nav from "./components/pages/Nav";

const App = () => {

  return (
    <div className="flex justify-center w-full bg-gray-100 h-[100dvh]">
      <div className="flex overflow-hidden flex-col w-full bg-gray-100 shadow-lg max-w-[480px] h-full">
        <Nav />

        {/* 콘텐츠 영역 - 남은 공간 전체 사용 */}
        <div className="flex-1 min-h-0 overflow-hidden bg-gray-100 flex flex-col">
          <Outlet />
        </div>

        {/* 하단 네비게이션 - 고정 높이, 축소 안함 */}
        <div className="flex-shrink-0">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default App;
