import useWorryData from "../../hooks/useWorryData";
import LogForm from "./LogForm";

const ForestLog = () => {
  const { data: forestData, refreshData } = useWorryData();

  if (!forestData || !Array.isArray(forestData)) {
    return null;
  }

  return (
    <>
      {forestData.length > 0 && (
        <div className="h-1/5 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {forestData.map((e) => (
            <LogForm key={e.id} data={e} onDelete={refreshData} />
          ))}
        </div>
      )}
    </>
  );
};

export default ForestLog;
