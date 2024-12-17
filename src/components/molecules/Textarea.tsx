import React, { ChangeEvent, useMemo } from "react";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxRows?: number; // 최대 줄 수
  minHeight?: string; // 최소 높이
  className?: string;
}

const Textarea = ({
  id,
  value,
  onChange,
  placeholder = "",
  maxRows = 13,
  minHeight = "120px",
  className = "",
}:TextareaProps) => {
  const calculateRows = (text: string) => {
    const lineCount = text.split("\n").length;
    return Math.min(lineCount, maxRows);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = useMemo(() => calculateRows(value), [value]);

  return (
    <textarea
      id={id}
      className={`w-full p-3 transition duration-200 ease-in-out border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        borderRadius: 15,
        height: "auto",
        minHeight,
        maxHeight: "auto",
        overflowY: rows >= maxRows ? "auto" : "hidden",
      }}
    />
  );
};

export default Textarea;
