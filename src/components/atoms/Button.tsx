import React from 'react';

type ButtonType = {
    text: string;
    color?: string;
    fontSize?: number;
    bgColor?: string;
    onPress?: () => void;
};

const Button = ({ text, color, fontSize, bgColor, onPress }: ButtonType) => {
    return (
        <button
            onClick={onPress}
            className={`w-full h-full flex justify-center items-center rounded-xl ${
                bgColor || 'bg-white'
            }`}
            style={{ backgroundColor: bgColor, borderRadius: '15px' }}
        >
            <span
                className={`font-bold ${color || 'text-white'}`}
                style={{ fontSize: fontSize || 16 }}
            >
                {text}
            </span>
        </button>
    );
};

export default Button;
