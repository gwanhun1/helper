import React, { ChangeEvent, useMemo } from "react";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxRows?: number;
  minHeight?: string;
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
}: TextareaProps) => {
  const calculateRows = (text: string) => {
    const lineCount = text.split("\n").length;
    return Math.min(lineCount, maxRows);
  };

  const rows = useMemo(() => calculateRows(value), [value]);

  return (
    <textarea
      id={id}
      className={`p-3 w-full rounded-md border border-gray-300 shadow-sm transition duration-200 ease-in-out resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-[16px] ${className}`}
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
