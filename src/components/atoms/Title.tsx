import React from 'react';

interface TitleProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({
    children,
    color = 'text-green-500',
    className = '',
}) => {
    return (
        <h1
            className={`text-xl font-semibold tracking-tightest ${color} ${className}`}
            style={{
                fontStretch: 'ultra-condensed',
            }}
        >
            {children}
        </h1>
    );
};

export default Title;
