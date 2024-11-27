import WeekendLogs from '../templates/WeekendLogs';

const Logs = () => {
    return (
        <>
            <div className="p-4 mt-5 ">
                <WeekendLogs />
            </div>
            <div className="p-4">
                <WeekendLogs />
            </div>
            <div className="p-4">
                <WeekendLogs />
            </div>
        </>
    );
};

export default Logs;
