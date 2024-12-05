import { useLocation } from 'react-router-dom';
import { AiTwotoneSmile } from 'react-icons/ai';

const Nav = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/credit' &&
            location.pathname !== '/auth' ? (
                <div className="sticky top-0 z-10 bg-white">
                    <div className={`${
                        location.pathname === '/credit' ? '' : 'p-4'
                    }`}>
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-green">HELPER</p>
                            <button 
                                className="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="User menu"
                            >
                                <AiTwotoneSmile className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Nav;
