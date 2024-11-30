import React from "react";

type InfoRowProps = {
  icon?: React.ReactNode; // 아이콘 컴포넌트 전달
  mainText: string | React.ReactNode; // 주요 텍스트 (문자열 또는 React 노드)
  subText?: string; // 보조 텍스트 (옵션)
};

const IconRow: React.FC<InfoRowProps> = ({ icon, mainText, subText }) => {
  const isReactNode = React.isValidElement(mainText); // React 노드인지 확인

  return (
    <>
      <div
        className={`flex ${isReactNode ? "items-start" : "items-center"} gap-3`}
      >
        {icon && (
          <div
            className={`flex-shrink-0 p-3 ${
              isReactNode ? "mt-2" : ""
            } rounded-lg bg-slate-100`}
          >
            {icon}
          </div>
        )}
        <div className="text-sm font-semibold text-gray-700">{mainText}</div>
      </div>
      {subText && (
        <div
          className={`flex ${
            isReactNode ? "justify-end" : "justify-start ml-16"
          }`}
        >
          <p className="my-1 text-xs text-gray-500">{subText}</p>
        </div>
      )}
    </>
  );
};

export default IconRow;
