import { Outlet } from "react-router-dom";
import "./index.css";
import BottomNavigation from "./components/molecules/BottomNavigation";
import Nav from "./components/pages/Nav";

const App = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full md:max-w-[375px] h-full  shadow-lg flex flex-col">
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
