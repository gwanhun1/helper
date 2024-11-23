type ButtonType = {
    text: string;
    color?: string;
    fontSize?: number;
    bgColor?: string;
    onPress?: () => void;
    outline?: boolean; // 옵셔널로 outline 추가
    size?: 'sm' | 'md' | 'lg'; // 옵셔널로 사이즈 추가
};

const Button = ({
    text,
    color,
    fontSize,
    bgColor,
    onPress,
    outline,
    size = 'md', // 기본값은 'md'
}: ButtonType) => {
    // Define the sizes for sm, md, lg
    const sizeClasses = {
        sm: 'px-2 py-1 text-sm', // small size
        md: 'px-4 py-2 text-base', // medium size (default)
        lg: 'px-6 py-3 text-lg', // large size
    };

    return (
        <button
            onClick={onPress}
            className={`flex items-center justify-center rounded-lg shadow-lg 
            ${bgColor || 'bg-green-500'} 
            ${color || 'text-white'} 
            ${outline ? 'border border-gray-300' : ''} // 테두리 스타일 추가
            ${sizeClasses[size]} // 사이즈 클래스 적용
            hover:bg-opacity-80 active:bg-opacity-60 focus:outline-none 
            transition-all duration-300`}
            style={{
                fontSize: fontSize || 14,
                minWidth: '50px',
                maxWidth: '250px',
            }}
        >
            <span className="truncate">{text}</span>
        </button>
    );
};

export default Button;
