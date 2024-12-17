import React, { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
    color?: string;
    className?: string;
}

const Title = ({
    children,
    color = 'text-green-600',
    className = '',
}:TitleProps) => {
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
