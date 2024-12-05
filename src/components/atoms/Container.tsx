import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`
            w-full h-full
            overflow-y-auto overscroll-contain
            bg-white
            flex flex-col
            ${className}
        `}>
            <div className="
                flex-1 w-full
                px-4 md:px-6
                pt-4 md:pt-6
                pb-safe
            ">
                {children}
            </div>
        </div>
    );
};

export default Container;
