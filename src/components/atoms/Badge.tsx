import React, { ReactNode } from 'react';

type BadgeProps = {
    color?: string; // 텍스트 및 테두리 색상
    backgroundColor?: string; // 배경색
    fontSize?: number; // 텍스트 크기
    children: ReactNode; // 뱃지 안의 내용
};

const Badge: React.FC<BadgeProps> = ({
    color = '#50b196',
    backgroundColor = '#e6f8f2',
    fontSize = 16,
    children,
}) => {
    return (
        <div
            className="inline-flex items-center justify-center px-3 py-1 rounded-full shadow-md"
            style={{
                border: `2px solid ${color}`, // 테두리 색
                backgroundColor, // 배경색
            }}
        >
            <span
                className="font-medium"
                style={{
                    color, // 텍스트 색
                    fontSize, // 텍스트 크기
                }}
            >
                {children}
            </span>
        </div>
    );
};

export default Badge;
