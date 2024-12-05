import React from 'react';

interface SubtitleProps {
    children: React.ReactNode;
    className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({
    children,
    className = '',
}) => {
    return (
        <p className={`px-2 mt-2 ml-2 text-xs text-gray-600 ${className}`}>
            {children}
        </p>
    );
};

export default Subtitle;
