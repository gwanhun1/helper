import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container= ({
    children,
    className = '',
}:ContainerProps) => {
    return (
        <div className={`h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}>
            {children}
        </div>
    );
};

export default Container;
