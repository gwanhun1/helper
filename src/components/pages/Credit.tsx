import { FiPackage } from "react-icons/fi";

const Credit = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 bg-green-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-200 p-4 rounded-full">
            <FiPackage className="text-3xl text-green-600" />
          </div>
        </div>
        <h1 className="text-[22px] font-extrabold text-gray-900 mb-3">
          프리미엄 회원권
        </h1>
        <p className="text-[15px] text-gray-600 font-medium">
          곧 돌아옵니다
          <span className="inline-block ml-1 animate-bounce">🎁</span>
        </p>
      </div>
    </div>
  );
};

export default Credit;
