import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
}) => {
    return (
        <div className={`h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}>
            {children}
        </div>
    );
};

export default Container;
