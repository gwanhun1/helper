import React from 'react';
import useUserStore from '../../store/userStore';
import Text from '../atoms/Text';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Text className="text-lg text-gray-600">로그인하여 사용해주세요</Text>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
