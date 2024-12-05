import useLogData from "../../hooks/useLogData";
import LogForm from "./LogForm";

const ForestLog = () => {
  const { data: forestData, refreshData } = useLogData();

  return (
    <div
      className="h-1/5 max-h-[600px] overflow-y-auto "
      style={{
        height: "500px",
        minHeight: "500px",
      }}
    >
      {forestData.map((e) => (
        <LogForm key={e.id} data={e} onDelete={refreshData} />
      ))}
    </div>
  );
};

export default ForestLog;
