import PageLayout from "../organisms/PageLayout";
import Forest from "../organisms/Forest";
import ForestLog from "../organisms/ForestLog";
import MindTemplate from "../organisms/MindTemplate";
import AuthAlert from "../molecules/AuthAlert";

const Home = () => {
  return (
    <PageLayout requireAuth>
      <div className="flex flex-col">
        <MindTemplate/>
        <Forest />
        <ForestLog />
      </div>
      <AuthAlert />
    </PageLayout>
  );
};

export default Home;
