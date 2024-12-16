import { RiKakaoTalkFill } from "react-icons/ri";

const AdviceBanner = () => {
  return (
    <div className="rounded-2xl p-4 border border-[#E5E8EB] bg-[#def9f8]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 bg-[#2AC1BC] rounded-full flex items-center justify-center">
          <RiKakaoTalkFill className="text-white" size={24} />
        </div>
        <div>
          <h2 className="font-bold text-[#333333]">오늘의 고민 공유하기</h2>
          <p className="text-sm text-[#666666]">다른 사람들과 고민을 나눠보세요</p>
        </div>
      </div>
    </div>
  );
};

export default AdviceBanner;
