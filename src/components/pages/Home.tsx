import Forest from '../organisms/Forest';
import ForestAdd from '../organisms/ForestAdd';

const Home = () => {
    return (
        <div className="flex flex-col h-full p-2">
            <Forest />
            <ForestAdd />
        </div>
    );
};

export default Home;
