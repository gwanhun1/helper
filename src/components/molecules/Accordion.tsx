import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";

type AccordionProps = {
  title: string;
  content: string;
  width?: number;
  isOpen: boolean;
  onToggle: () => void;
};

const Accordion = ({ title, content, width, isOpen, onToggle }: AccordionProps) => {
  const toggleAccordion = () => {
    onToggle();
  };

  return (
    <div
      className={`rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col ${
        width ? `w-[${width}%]` : "w-full"
      } overflow-hidden`}
    >
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full py-2.5 px-3.5 border-b border-slate-50 shrink-0 bg-white/50"
      >
        <p
          className={`text-[14px] font-bold text-slate-700 max-w-[80%] ${
            !isOpen
              ? "truncate whitespace-nowrap overflow-hidden"
              : "break-words text-left"
          }`}
        >
          {title}
        </p>
        <div className="flex items-center justify-center w-6 h-6 ml-2 text-slate-300">
          {!isOpen ? (
            <FaPlusCircle size={18} />
          ) : (
            <FaMinusCircle size={18} />
          )}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-y-auto ${
          !isOpen ? "h-0 opacity-0" : "flex-1 opacity-100"
        } bg-gradient-to-b from-white to-slate-50/30`}
      >
        <div className="flex items-start justify-start px-4 pt-3 pb-4">
          <div className="flex-shrink-0 p-2.5 mr-3 rounded-xl bg-slate-100/80">
            <AiOutlineRobot className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[13px] text-slate-500 leading-relaxed font-medium pt-1">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
