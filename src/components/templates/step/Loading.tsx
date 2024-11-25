import React, { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [textStep, setTextStep] = useState<number>(0);

  const TextArea = [
    "조언자\n 구하는 중 😌",
    "컨셉\n 잡는 중 😂",
    "수수료\n 내는 중 🥺",
    "조합하는 중 😍",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextStep((prev) => prev + 1);
      if (textStep === 3) {
        setTextStep(0);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [textStep]);

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <p className="text-[#4abd9d] text-5xl font-bold whitespace-pre-line">
        {TextArea[textStep]}
      </p>
    </div>
  );
};

export default Loading;
