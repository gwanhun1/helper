import KakaoLogin from "../molecules/KakaoLogin";
import NewsContents from "../organisms/NewsContents";

const Auth = () => {
  return (
    <div className="flex flex-col justify-between h-full bg-green">
      <div className="flex relative flex-col flex-grow justify-center items-center">
        <div className="absolute top-1/2 text-5xl font-bold text-white transform -translate-y-1/2 helper-text">
          MindLift
        </div>
        <div className="absolute bottom-1 w-5/6">
          <NewsContents />
        </div>
      </div>

      <div className="flex justify-center items-center py-10 pt-2 h-1/7">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default Auth;
