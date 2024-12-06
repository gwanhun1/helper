import PageLayout from "../organisms/PageLayout";
import Forest from "../organisms/Forest";
import ForestLog from "../organisms/ForestLog";

const Home = () => {
  return (
    <PageLayout requireAuth>
      <div className="flex flex-col ">
        <Forest />
        <div className="flex-1 overflow-hidden">
          <ForestLog />
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
