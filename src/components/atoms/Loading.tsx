import React from "react";

interface LoadingProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 40, className = "" }: LoadingProps) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="w-full h-full border-8 border-green-700 border-t-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loading;
