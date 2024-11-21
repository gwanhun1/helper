import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaHome,
    FaComment,
    FaDatabase,
    FaPiggyBank,
    FaUser,
} from 'react-icons/fa';

const BottomNavigation: React.FC = () => {
    return (
        <div className="flex justify-between items-center bg-white p-4 border-t-2 bottom-0 left-0 w-full shadow-lg">
            {/* 각 탭 버튼들 */}
            <TabButton to="/" icon={<FaHome />} label="Home" />
            <TabButton to="/worry" icon={<FaComment />} label="조언" />
            <TabButton to="/logs" icon={<FaDatabase />} label="로그" />
            <TabButton to="/credit" icon={<FaPiggyBank />} label="결제" />
            <TabButton to="/user" icon={<FaUser />} label="내정보" />
        </div>
    );
};

// 재사용 가능한 Tab 버튼 컴포넌트
interface TabButtonProps {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ to, icon, label }) => {
    return (
        <Link
            to={to}
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 flex-1 justify-center"
        >
            <div className="text-xl">{icon}</div>
            <div className="text-[13px] mt-2">{label}</div>
        </Link>
    );
};

export default BottomNavigation;
