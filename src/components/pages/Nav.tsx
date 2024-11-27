import { useLocation } from 'react-router-dom';
import { AiTwotoneSmile } from 'react-icons/ai';
const Nav = () => {
    const location = useLocation(); // 현재 경로 가져오기

    return (
        <>
            {location.pathname !== '/credit' &&
            location.pathname !== '/auth' ? (
                <div
                    className={`${
                        location.pathname === '/credit' ? '' : 'mt-8 p-2'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-green">HELPER</p>
                        <AiTwotoneSmile />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Nav;
