import React, { useMemo } from 'react';

interface TextareaProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    maxRows?: number; // 최대 줄 수
    minHeight?: string; // 최소 높이
    className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    id,
    value,
    onChange,
    placeholder = '',
    maxRows = 13, // 기본 최대 줄 수는 13
    minHeight = '120px', // 기본 최소 높이
    className = '',
}) => {
    // 입력된 텍스트의 줄 수를 계산하는 함수
    const calculateRows = (text: string) => {
        const lineCount = text.split('\n').length;
        return Math.min(lineCount, maxRows);
    };

    // `rows`는 memoization을 통해 계산
    const rows = useMemo(() => calculateRows(value), [value]);

    return (
        <textarea
            id={id}
            className={`w-full p-3 transition duration-200 ease-in-out border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows} // 계산된 줄 수 설정
            style={{
                borderRadius: 15,
                height: 'auto',
                minHeight, // props에서 설정 가능
                maxHeight: 'auto',
                overflowY: rows >= maxRows ? 'auto' : 'hidden', // 최대 줄 수 초과 시 스크롤 활성화
            }}
        />
    );
};

export default Textarea;
