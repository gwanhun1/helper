import Forest from "../organisms/Forest";
import ForestLog from "../organisms/ForestLog";

const Home = () => {
  return (
    <div className="flex flex-col h-full p-2">
      <Forest />
      <ForestLog />
    </div>
  );
};

export default Home;
