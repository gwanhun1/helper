import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AiOutlinePlusCircle,
    AiOutlineSearch,
    AiOutlineHome,
    AiOutlineCreditCard,
    AiOutlineUser,
} from 'react-icons/ai';
import { AiFillHome, AiFillCreditCard, AiFillPlusCircle } from 'react-icons/ai';

const BottomNavigation: React.FC = () => {
    const location = useLocation(); // 현재 경로 가져오기

    return (
        <div className="bottom-0 left-0 flex items-center justify-between w-full p-4 bg-white border-t-2 shadow-lg">
            {/* 각 탭 버튼들 */}
            <TabButton
                to="/"
                icon={
                    location.pathname === '/' ? (
                        <AiFillHome />
                    ) : (
                        <AiOutlineHome />
                    )
                }
                label="Home"
                active={location.pathname === '/'}
            />
            <TabButton
                to="/logs"
                icon={
                    location.pathname === '/logs' ? (
                        <AiOutlineSearch />
                    ) : (
                        <AiOutlineSearch />
                    )
                }
                label="로그"
                active={location.pathname === '/logs'}
            />
            <TabButton
                to="/worry"
                icon={
                    location.pathname === '/worry' ? (
                        <AiFillPlusCircle />
                    ) : (
                        <AiOutlinePlusCircle />
                    )
                }
                label="조언"
                active={location.pathname === '/worry'}
            />
            <TabButton
                to="/credit"
                icon={
                    location.pathname === '/credit' ? (
                        <AiFillCreditCard />
                    ) : (
                        <AiOutlineCreditCard />
                    )
                }
                label="결제"
                active={location.pathname === '/credit'}
            />
            <TabButton
                to="/user"
                icon={
                    location.pathname === '/user' ? (
                        <AiOutlineUser />
                    ) : (
                        <AiOutlineUser />
                    )
                }
                label="내정보"
                active={location.pathname === '/user'}
            />
        </div>
    );
};

// 재사용 가능한 Tab 버튼 컴포넌트
interface TabButtonProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    active: boolean; // 활성화 여부
}

const TabButton: React.FC<TabButtonProps> = ({ to, icon, label, active }) => {
    return (
        <Link
            to={to}
            className={`flex flex-col items-center flex-1 justify-center ${
                active
                    ? 'text-green' // 활성화된 탭에서 글자 색만 변함
                    : 'text-gray-600 hover:text-green' // 비활성화된 탭에서 hover 시 글자 색 변함
            } py-2 px-4 transition-all duration-200`}
        >
            <div className="text-xl">{icon}</div>
            <p className="text-[13px] mt-2 text-xs whitespace-nowrap">
                {label}
            </p>
        </Link>
    );
};

export default BottomNavigation;
