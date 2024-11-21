import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Logs from '../pages/Logs';
import User from '../pages/User';
import Worry from '../pages/Worry';
import Credit from '../pages/Credit';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/Logs',
        element: <Logs />,
    },
    {
        path: '/Credit',
        element: <Credit />,
    },
    {
        path: '/User',
        element: <User />,
    },
    {
        path: '/Worry',
        element: <Worry />,
    },
    {
        path: '*',
        element: <User />,
    },
]);

export default router;
