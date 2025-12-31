import React from "react";

interface BubbleCardProps {
  text?: string;
  className?: string;
}

const BubbleCard = ({ text = "\u00A0", className = "" }: BubbleCardProps) => {
  const displayText = text.trim() === "" ? "\u00A0" : text;

  return (
    <div
      className={`
        relative px-6 py-4 rounded-3xl border whitespace-nowrap
        bg-white text-slate-900 border-green-100 shadow-[0_18px_50px_rgba(122,196,167,0.18)]
        ${className}
      `}
    >
      <p className="text-xl font-black leading-tight tracking-tighter">
        {displayText}
      </p>
      <div
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 border-r border-b bg-white border-green-100"
      />
    </div>
  );
};

export default BubbleCard;
