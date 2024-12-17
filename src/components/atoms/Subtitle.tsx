import React, { ReactNode } from 'react';

interface SubtitleProps {
    children: ReactNode;
    className?: string;
}

const Subtitle = ({
    children,
    className = '',
}:SubtitleProps) => {
    return (
        <p className={`px-2 mt-2 ml-2 text-xs text-gray-600 ${className}`}>
            {children}
        </p>
    );
};

export default Subtitle;
