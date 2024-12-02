import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import TitleContainer from "../../atoms/TitleContainer";

const StepTwo = () => {
  const { increase, decrease } = useStepStore();
  const { setWho } = useWorryStore();

  const handleWhoSelection = (who: string) => {
    setWho(who);
    increase();
  };

  return (
    <div className="p-2">
      <TitleContainer
        title="누구에게 듣고싶나요?"
        subtitle="당신의 고민을 들어줄 대상을 골라주세요."
        titleColor="text-green-700"
      />

      {/* 버튼 컨테이너 */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Button
          onPress={() => decrease()}
          text="Back"
          color="#000"
          bgColor="bg-slate-100"
          outline
        />
        <Button
          onPress={() => handleWhoSelection("엄마")}
          text="엄마"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("아빠")}
          text="아빠"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("형/오빠")}
          text="형/오빠"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("동생")}
          text="동생"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("친구")}
          text="친구"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("선생님")}
          text="선생님"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("헬스트레이너")}
          text="헬스트레이너"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("할머니")}
          text="할머니"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("할아버지")}
          text="할아버지"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("동네 아저씨")}
          text="동네 아저씨"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("백수")}
          text="백수"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("재벌 회장님")}
          text="재벌 회장님"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("연예인")}
          text="연예인"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("CEO")}
          text="CEO"
          bgColor="bg-green-700"
        />

        <Button
          onPress={() => handleWhoSelection("학생")}
          text="유치원생"
          bgColor="bg-green-700"
        />

        <Button
          onPress={() => handleWhoSelection("이웃")}
          text="백수 이웃"
          bgColor="bg-green-700"
        />
        <Button
          onPress={() => handleWhoSelection("미래 자녀")}
          text="자녀"
          bgColor="bg-green-700"
        />

        <Button
          onPress={() => handleWhoSelection("외계인")}
          text="외계인"
          bgColor="bg-blue-700"
        />
        <Button
          onPress={() => handleWhoSelection("타임머신 타고 온 사람")}
          text="타임머신 타고 온 사람"
          bgColor="bg-yellow-700"
        />
        <Button
          onPress={() => handleWhoSelection("만화 캐릭터")}
          text="만화 캐릭터"
          bgColor="bg-purple-700"
        />
        <Button
          onPress={() => handleWhoSelection("로봇")}
          text="로봇"
          bgColor="bg-gray-700"
        />
        <Button
          onPress={() => handleWhoSelection("스파이")}
          text="괴물"
          bgColor="bg-red-700"
        />
        <Button
          onPress={() => handleWhoSelection("슈퍼히어로")}
          text="슈퍼히어로"
          bgColor="bg-orange-700"
        />
        <Button
          onPress={() => handleWhoSelection("악당")}
          text="악당"
          bgColor="bg-black"
        />
        <Button
          onPress={() => handleWhoSelection("마법사")}
          text="마법사"
          bgColor="bg-indigo-700"
        />
        <Button
          onPress={() => handleWhoSelection("아이돌")}
          text="아이돌"
          bgColor="bg-pink-700"
        />
        <Button
          onPress={() => handleWhoSelection("동화 속 캐릭터")}
          text="동화 속 캐릭터"
          bgColor="bg-teal-700"
        />
      </div>
    </div>
  );
};

export default StepTwo;
