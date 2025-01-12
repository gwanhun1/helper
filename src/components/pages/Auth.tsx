import KakaoLogin from "../molecules/KakaoLogin";
import NewsContents from "../organisms/NewsContents";

const Auth = () => {
  return (
    <div className="h-full bg-green flex flex-col justify-between">
      <div className="flex-grow flex flex-col items-center justify-center relative">
        <div className="text-5xl font-bold text-white helper-text absolute top-1/2 transform -translate-y-1/2">
          MindLift
        </div>
        <div className="absolute bottom-1 w-5/6 ">
          <NewsContents />
        </div>
      </div>

      <div className="flex items-center justify-center h-1/7 py-10 pt-2">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default Auth;
