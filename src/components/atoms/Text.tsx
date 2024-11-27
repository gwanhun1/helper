interface TextProps {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    fontWeight?: 'light' | 'normal' | 'medium' | 'bold' | 'extrabold';
    className?: string;
}

export const Text: React.FC<TextProps> = ({
    children,
    size = 'md',
    fontWeight = 'normal',
    className = '',
}) => {
    const sizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
    };

    const fontWeightClasses = {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
    };

    return (
        <p
            className={`${sizeClasses[size]} ${fontWeightClasses[fontWeight]} ${className}`}
        >
            {children}
        </p>
    );
};
