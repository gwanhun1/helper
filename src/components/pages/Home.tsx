import Forest from "../organisms/Forest";
import ForestLog from "../organisms/ForestLog";

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <Forest />
      <ForestLog />
    </div>
  );
};

export default Home;
