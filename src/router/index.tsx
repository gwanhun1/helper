// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // App 컴포넌트를 임포트
import Home from '../components/pages/Home';
import Logs from '../components/pages/Logs';
import User from '../components/pages/User';
import Worry from '../components/pages/Worry';
import Credit from '../components/pages/Credit';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App을 루트 컴포넌트로 설정
        children: [
            {
                path: '/',
                element: <Home />, // Home 페이지
            },
            {
                path: '/Logs',
                element: <Logs />, // Logs 페이지
            },
            {
                path: '/Credit',
                element: <Credit />, // Credit 페이지
            },
            {
                path: '/User',
                element: <User />, // User 페이지
            },
            {
                path: '/Worry',
                element: <Worry />, // Worry 페이지
            },
        ],
    },
    {
        path: '*',
        element: <User />, // 모든 잘못된 경로는 User로 리디렉션
    },
]);

export default router;
