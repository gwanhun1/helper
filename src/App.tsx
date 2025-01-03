import { Outlet } from "react-router-dom";
import "./index.css";
import BottomNavigation from "./components/molecules/BottomNavigation";
import Nav from "./components/pages/Nav";

const App = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full md:max-w-[375px] h-full  shadow-lg flex flex-col">
        <Nav />

        <div className="flex-grow overflow-hidden bg-gray-100">
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
