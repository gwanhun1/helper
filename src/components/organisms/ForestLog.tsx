import useLogData from "../../hooks/useLogData";
import LogForm from "./LogForm";

const ForestLog = () => {
  const { data: forestData } = useLogData();

  return (
    <div className="h-1/5 px-2">
      {forestData.map((e) => (
        <LogForm data={e} />
      ))}
    </div>
  );
};

export default ForestLog;
