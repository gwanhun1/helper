import { Outlet } from 'react-router-dom';
import './index.css';
import BottomNavigation from './components/molecules/BottomNavigation';

const App = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
            {/* 화면 높이에 꽉 차도록 설정 */}
            <div className="w-full max-w-[375px] h-full bg-white  shadow-lg flex flex-col">
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
