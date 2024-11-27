import React from 'react';

interface TitleContainerProps {
    title: string; // 타이틀을 전달받는 props
    subtitle?: string; // 선택적 부제목
    titleColor?: string; // 타이틀 색상 (옵셔널)
}

const TitleContainer: React.FC<TitleContainerProps> = ({
    title,
    subtitle,
    titleColor,
}) => {
    return (
        <div className="px-2 pb-2 mb-4 border-b border-gray-300">
            <h1
                className={`text-xl font-semibold tracking-tightest ${
                    titleColor || 'text-green-500'
                }`}
                style={{
                    fontStretch: 'ultra-condensed',
                }}
            >
                {title}
            </h1>
            {subtitle && (
                <p className="px-2 mt-2 ml-2 text-xs text-gray-600">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default TitleContainer;
