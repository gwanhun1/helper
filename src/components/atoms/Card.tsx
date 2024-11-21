import { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
};

const Card = ({ children }: CardProps) => {
    return (
        <div className="bg-white rounded-lg p-5 w-full shadow-lg">
            {children}
        </div>
    );
};

export default Card;
