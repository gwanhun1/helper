import { useState } from 'react';
import WeekendLogs from '../templates/WeekendLogs';
import TextareaConatiner from '../templates/TextareaConatiner';

const Logs = () => {
    const [todaySelect, setTodaySelect] = useState(-1);
    const [weekendSelect, setWeekendSelect] = useState(-1);
    const [monthSelect, setMonthSelect] = useState(-1);

    // 공통 렌더링 함수
    const renderLogs = (
        currentSelect: number,
        setCurrentSelect: React.Dispatch<React.SetStateAction<number>>,
        dependentSelects: number[]
    ) => {
        // 다른 select 값이 활성화된 경우 null 반환
        if (dependentSelects.some((select) => select > 0)) return null;

        // 현재 select 상태에 따라 컴포넌트 렌더링
        return currentSelect !== -1 ? (
            <TextareaConatiner setSelect={setCurrentSelect} />
        ) : (
            <WeekendLogs setSelect={setCurrentSelect} />
        );
    };

    return (
        <>
            <div className="p-4 mt-5 ">
                {renderLogs(todaySelect, setTodaySelect, [
                    weekendSelect,
                    monthSelect,
                ])}
            </div>
            <div className="p-4">
                {renderLogs(weekendSelect, setWeekendSelect, [
                    todaySelect,
                    monthSelect,
                ])}
            </div>
            <div className="p-4">
                {renderLogs(monthSelect, setMonthSelect, [
                    todaySelect,
                    weekendSelect,
                ])}
            </div>
        </>
    );
};

export default Logs;
