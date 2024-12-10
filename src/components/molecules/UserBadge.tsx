import React from 'react';
import Text from '../atoms/Text';

interface UserBadgeProps {
    email: string | null | undefined;
    grade?: string;
    className?: string;
}

const UserBadge: React.FC<UserBadgeProps> = ({
    email,
    // grade = '일반회원',
    className = '',
}) => {
    return (
        <div className={`flex items-center ${className}`}>
            <Text className="text-xl font-semibold">
                {email === "이메일 없음" || email === null
                    ? "카카오로 로그인한 계정입니다."
                    : email}
            </Text>
            
        </div>
    );
};

export default UserBadge;
