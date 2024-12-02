import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import TitleContainer from "../../atoms/TitleContainer";

const StepThree = () => {
  const { increase, decrease } = useStepStore();
  const { setHow } = useWorryStore();

  return (
    <div className="p-2">
      <TitleContainer
        title="어떻게 듣고싶나요?"
        subtitle="때로는 색다른 느낌의 조언이 힘이 됩니다."
      />
      {/* 버튼 컨테이너 */}
      <div className="flex flex-wrap gap-2 mt-3 ">
        <Button
          onPress={() => decrease()}
          text="Back"
          color="#000"
          bgColor="bg-slate-100"
          outline
        />
        <Button
          onPress={() => setHow("2")}
          text="Short"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="A Little Longer Text"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="Medium Text"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="Another Button with Text"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="Dynamic Button"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="Ask Me Anything"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="This is a Much Longer Button Text"
          bgColor="bg-green-400"
        />
        <Button
          onPress={() => increase()}
          text="Final Button"
          bgColor="bg-green-400"
        />
      </div>
    </div>
  );
};

export default StepThree;
