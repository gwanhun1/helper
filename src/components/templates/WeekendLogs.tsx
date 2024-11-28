import TitleContainer from "../atoms/TitleContainer";
import LogForm from "../organisms/LogForm";

const WeekendLogs = () => {
  return (
    <>
      <TitleContainer title="주간" />
      <LogForm />
      <LogForm />
      <LogForm />
    </>
  );
};

export default WeekendLogs;
