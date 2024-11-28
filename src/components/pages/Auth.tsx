import KakaoLogin from "../molecules/KakaoLogin";

const Auth = () => {
  return (
    <div className="h-full bg-green-400">
      <div className="flex items-center justify-center h-5/6">
        <div className="text-4xl font-bold text-white">HELPER</div>
      </div>
      <div className="flex items-center justify-center h-1/6">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default Auth;
