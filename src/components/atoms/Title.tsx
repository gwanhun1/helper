import React, { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
    color?: string;
    className?: string;
}

const Title = ({
    children,
    color = 'text-slate-800',
    className = '',
}:TitleProps) => {
    return (
        <h1
            className={`font-bold tracking-tight ${color} text-[20px] sm:text-[22px] leading-snug ${className}`}
        >
            {children}
        </h1>
    );
};

export default Title;
