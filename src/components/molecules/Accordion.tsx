import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";

type AccordionProps = {
  title: string;
  content: string;
  width?: number;
};

const Accordion = ({ title, content, width }: AccordionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`my-4 rounded-lg shadow-md ${
        width ? `w-[${width}%]` : "w-full"
      }`}
    >
      <button
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full p-3 bg-white rounded-lg border border-b-2"
      >
        <p
          className={`text-sm max-w-52 ${
            isCollapsed
              ? "truncate whitespace-nowrap overflow-hidden"
              : "break-words text-left"
          }`}
        >
          {title}
        </p>
        <div className="flex items-center justify-center w-6 h-6 ml-2">
          {isCollapsed ? (
            <FaPlusCircle className="text-gray-500" size={16} />
          ) : (
            <FaMinusCircle className="text-gray-500" size={16} />
          )}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}
      >
        <div className="px-4 pb-4 pt-2 flex justify-center items-center">
          <div className="flex-shrink-0 p-2 rounded-lg bg-slate-100 mr-2">
            <AiOutlineRobot className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs text-gray-700 ">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
