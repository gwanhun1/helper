import useUserStore from "../../store/userStore";
import Forest from "../organisms/Forest";
import ForestLog from "../organisms/ForestLog";

const Home = () => {

  const user = useUserStore((state) => state.user); // 상태에서 사용자 정보 가져오기



  return (<>
    {user? <div className="flex flex-col h-full">
      <Forest />
      <ForestLog />
    </div>:<>로그인하여 사용해주세요</>}</>
  );
};

export default Home;
