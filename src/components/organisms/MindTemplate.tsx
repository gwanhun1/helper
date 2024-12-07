import { useEffect, useState } from "react";
import useWorryData from "../../hooks/useWorryData";
import MindCard from "./MindCard";

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

    return (
        <div className="w-full h-full">
            <MindCard 
                averageLevel={averageLevel}
                bgColor={bgColor}
            />
        </div>
    );
}

export default MindTemplate;