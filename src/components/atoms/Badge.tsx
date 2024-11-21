import { ReactNode } from 'react';

type BadgeProps = {
    color?: string;
    fontSize?: number;
    children: ReactNode;
};

const Badge = ({ color, fontSize, children }: BadgeProps) => {
    return (
        <div
            className={`flex items-center justify-center border px-3 py-1 rounded-lg`}
            style={{ borderColor: color || '#50b196' }}
        >
            <span
                className="text-center"
                style={{ color: color || '#50b196', fontSize: fontSize || 16 }}
            >
                {children}
            </span>
        </div>
    );
};

export default Badge;
