import { Outlet } from 'react-router-dom';
import './index.css';

const App = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
            {/* 화면 높이에 꽉 차도록 설정 */}
            <div className="w-full max-w-[375px] h-full bg-white p-4 shadow-lg">
                {/* Outlet은 자식 컴포넌트가 여기에 렌더링됨 */}
                <Outlet />
            </div>
        </div>
    );
};

export default App;
