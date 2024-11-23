import { Outlet } from 'react-router-dom';
import './index.css';
import BottomNavigation from './components/molecules/BottomNavigation';
import Nav from './components/molecules/Nav';

const App = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
            {/* 화면 높이에 꽉 차도록 설정 */}
            <div className="w-full max-w-[375px] h-full bg-white  shadow-lg flex flex-col">
                <Nav />

                {/* Outlet을 감싸는 부모 div에 클래스 적용 */}
                <div className="flex-grow">
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
