import React from "react";

type InfoRowProps = {
  icon?: React.ReactNode; // 아이콘 컴포넌트 전달
  mainText: string | React.ReactNode; // 주요 텍스트 (문자열 또는 React 노드)
  subText?: string; // 보조 텍스트 (옵션)
};

const IconRow: React.FC<InfoRowProps> = ({ icon, mainText, subText }) => {
  return (
    <>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 p-3 rounded-lg bg-slate-100 mt-4">
            {icon}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-gray-700">{mainText}</div>
        </div>
        {subText && <p className="text-xs text-gray-500">{subText}</p>}
      </div>
    </>
  );
};

export default IconRow;
