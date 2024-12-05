import { Outlet } from "react-router-dom";
import "./index.css";
import Nav from "./components/pages/Nav";
import BottomNavigation from "./components/molecules/BottomNavigation";

const App = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full max-w-[375px] h-screen-safe bg-white shadow-lg flex flex-col pt-safe-top pb-safe-bottom">
        <Nav />
        <div className="flex-grow overflow-y-auto overscroll-contain">
          <Outlet />
        </div>
        <div className="mt-auto">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default App;
