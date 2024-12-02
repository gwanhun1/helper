import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import TitleContainer from "../../atoms/TitleContainer";

const StepThree = () => {
  const { increase, decrease } = useStepStore();
  const { setHow } = useWorryStore();

  // 공용으로 사용할 함수
  const handleHowSelection = (how: string) => {
    setHow(how);
    increase(); // 버튼 클릭 시 증가
  };

  return (
    <div className="p-2">
      <TitleContainer
        title="어떻게 듣고싶나요?"
        subtitle="때로는 색다른 느낌의 조언이 힘이 됩니다."
      />
      {/* 버튼 컨테이너 */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          onPress={() => {
            decrease();
          }}
          text="Back"
          color="#000"
          bgColor="bg-slate-100"
          outline
        />
        <Button
          onPress={() => handleHowSelection("웃기게")}
          text="웃기게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("다정하게")}
          text="다정하게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("랩으로")}
          text="랩으로"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("비아냥거리게")}
          text="비아냥거리게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("다급하게")}
          text="다급하게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("유머러스하게")}
          text="유머러스하게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("진지하게")}
          text="진지하게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("따뜻하게")}
          text="따뜻하게"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => handleHowSelection("감성적으로")}
          text="감성적으로"
          bgColor="bg-green-400"
        />
      </div>
    </div>
  );
};

export default StepThree;
