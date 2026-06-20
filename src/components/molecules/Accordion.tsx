import { AiOutlineRobot } from "react-icons/ai";

type AccordionProps = {
  title: string;
  content: string;
  width?: number;
};

const Accordion = ({ title, content, width }: AccordionProps) => {
  return (
    <div
      className={`rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col flex-1 min-h-0 ${
        width ? `w-[${width}%]` : "w-full"
      } overflow-hidden`}
    >
      <div className="py-2.5 px-3.5 border-b border-slate-50 shrink-0 bg-white/50">
        <p className="text-[14px] font-bold text-slate-700 break-words">
          {title}
        </p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-b from-white to-slate-50/30">
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
