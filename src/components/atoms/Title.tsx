import React from 'react';

interface TitleProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({
    children,
    color = 'text-green-600',
    className = '',
}) => {
    return (
        <h1
            className={`font-semibold tracking-tightest ${color} md:text-base ${className}`}
            style={{
                fontStretch: 'ultra-condensed',
            }}
        >
            {children}
        </h1>
    );
};

export default Title;
