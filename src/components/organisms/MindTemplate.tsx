import useWorryData from "../../hooks/useWorryData";
import { useEffect, useState } from "react";

const MindTemplate = () => {
    const { data: forestData } = useWorryData();
    const [bgColor, setBgColor] = useState("bg-green-300");

    const averageLevel = forestData && forestData.length > 0
    ? (forestData.reduce((sum, e) => sum + (e?.level ?? 0), 0) / forestData.length).toFixed(2)
    : null;

    useEffect(() => {
        if (averageLevel !== null) {
            const level = parseFloat(averageLevel);
            if (level < 3) setBgColor("bg-blue-300");
            else if (level < 6) setBgColor("bg-green-300");
            else setBgColor("bg-red-300");
        }
    }, [averageLevel]);
    
   

    const getMessage = () => {
        if (averageLevel === null) return "";
        const level = parseFloat(averageLevel);
        if (level < 3) return `마음이 차분하고 안정적입니다. <br/>계속 잘 유지하세요!`;
        if (level < 6) return `잘하고 계십니다. <br/>하지만 휴식을 취하고 여유를 가지세요.`;
        return `조금 벅차게 느껴지는 것 같습니다. <br/>자신을 위한 시간을 가져보세요.`;
    };

    return (
        <div className="w-full h-full">
            <div className={`flex flex-col items-center justify-center h-52 ${bgColor} m-4 rounded-xl shadow-lg transition-colors duration-500 ease-in-out animate-fade-in`}> 
            <div className="w-4 h-4 bg-white relative transform rotate-45 animate-pulse before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:-left-3 before:top-0 after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:-top-3 after:left-0"></div>
                <span className="text-4xl font-bold text-white mt-4">
                    {averageLevel}
                </span>
                <p className="mt-2 text-white text-center whitespace-pre-line" dangerouslySetInnerHTML={{ __html: getMessage() }} />
            </div>
        </div>
    );
}

export default MindTemplate;