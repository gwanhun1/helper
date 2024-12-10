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
      className={`mt-2 rounded-lg shadow-md  ${
        width ? `w-[${width}%]` : "w-full"
      }
       `}
    >
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full p-3 border border-transparent border-b-slate-200 rounded-lg "
      >
        <p
          className={`text-sm max-w-52 ${
            !isOpen
              ? "truncate whitespace-nowrap overflow-hidden"
              : "break-words text-left"
          }`}
        >
          {title}
        </p>
        <div className="flex items-center justify-center w-6 h-6 ml-2">
          {!isOpen ? (
            <FaPlusCircle className="text-gray-500" size={16} />
          ) : (
            <FaMinusCircle className="text-gray-500" size={16} />
          )}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          !isOpen ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}
      >
        <div className="flex items-center justify-center px-4 pt-2 pb-4">
          <div className="flex-shrink-0 p-2 mr-2 rounded-lg bg-slate-100">
            <AiOutlineRobot className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs text-gray-500 ">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
