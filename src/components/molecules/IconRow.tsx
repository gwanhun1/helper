import React from 'react';

type InfoRowProps = {
    icon?: React.ReactNode; // 아이콘 컴포넌트 전달
    mainText: string; // 주요 텍스트
    subText?: string; // 보조 텍스트 (옵션)
};

const IconRow: React.FC<InfoRowProps> = ({ icon, mainText, subText }) => {
    return (
        <div className="flex items-center gap-4">
            {icon && (
                <div className="flex-shrink-0 p-3 rounded-lg bg-slate-100">
                    {icon}
                </div>
            )}
            <div>
                <p className="text-sm font-semibold text-gray-700">
                    {mainText}
                </p>
                {subText && <p className="text-xs text-gray-500">{subText}</p>}
            </div>
        </div>
    );
};

export default IconRow;
