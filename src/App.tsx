import { Outlet } from "react-router-dom";
import "./index.css";
import BottomNavigation from "./components/molecules/BottomNavigation";
import Nav from "./components/pages/Nav";

const App = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      {/* 화면 높이에 꽉 차도록 설정 */}
      <div className="w-full md:max-w-[375px] h-full bg-green-700 shadow-lg flex flex-col">
        <Nav />

        {/* Outlet을 감싸는 div에 스크롤 추가 */}
        <div className="flex-grow overflow-hidden bg-gray-50">
          <Outlet />
        </div>

        {/* Bottom Navigation을 하단에 고정 */}
        <div className="mt-auto">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default App;
