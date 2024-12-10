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
        <div className="divide-y divide-gray-100 overflow-y-auto max-h-[70vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {forestData.map((e) => (
            <LogForm key={e.id} data={e} onDelete={refreshData} />
          ))}
        </div>
      )}
    </>
  );
};

export default ForestLog;
