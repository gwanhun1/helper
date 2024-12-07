import PageLayout from "../organisms/PageLayout";
import Forest from "../organisms/Forest";
import ForestLog from "../organisms/ForestLog";
import MindTemplate from "../organisms/MindTemplate";

const Home = () => {
  return (
    <PageLayout requireAuth>
      <div className="flex flex-col">
        <MindTemplate/>
        <Forest />
        
          <ForestLog />
        
      </div>
    </PageLayout>
  );
};

export default Home;
