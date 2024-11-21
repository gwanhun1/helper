import { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

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
                width ? `w-[${width}%]` : 'w-full'
            }`}
        >
            <button
                onClick={toggleAccordion}
                className="flex items-center justify-between w-full p-3 bg-white rounded-lg"
            >
                <p className="text-sm truncate">{title}</p>
                <div className="flex justify-center items-center w-6 h-6">
                    {isCollapsed ? (
                        <FaPlusCircle className="text-gray-500" size={16} />
                    ) : (
                        <FaMinusCircle className="text-gray-500" size={16} />
                    )}
                </div>
            </button>
            <div className={isCollapsed ? 'hidden' : 'block'}>
                <div className="p-4">
                    <p className="text-xs text-gray-700">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
