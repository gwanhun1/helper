import useLogData from "../../hooks/useLogData";
import LogForm from "./LogForm";

const ForestLog = () => {
  const { data: forestData, refreshData } = useLogData();

  if (!forestData || !Array.isArray(forestData)) {
    return null;
  }

  return (
    <>
      {forestData.length > 0 && (
        <div className="h-1/5 max-h-[600px] overflow-y-auto">
          {forestData.map((e) => (
            <LogForm key={e.id} data={e} onDelete={refreshData} />
          ))}
        </div>
      )}
    </>
  );
};

export default ForestLog;
