import useStepStore from "../../../store/stepStore";
import Button from "../../atoms/Button";
import TitleContainer from "../../atoms/TitleContainer";
import Textarea from "../../molecules/Textarea";
import { useState } from "react";
import Loading from "./Loading";
import useWorryStore from "../../../store/worryStore";
import useCounselingPrompt from "../../../hooks/useCounselingPrompt";

const StepFour = () => {
  const { increase, decrease } = useStepStore();
  const { setWorry, worry } = useWorryStore();
  const [textStep, setTextStep] = useState<number>(0);

  const { fetchResponse } = useCounselingPrompt();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorry(e.target.value);
  };

  const handleAsk = async () => {
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 5; // 0부터 4까지 반복
      setTextStep(step);
    }, 1000); // 1초마다 step 업데이트

    try {
      await fetchResponse(); // API 호출

      clearInterval(interval); // 로딩이 끝나면 interval 제거
      setTextStep(0); // 로딩 애니메이션 초기화
      increase(); // 다음 단계로 이동
    } catch (err) {
      clearInterval(interval); // 에러 발생 시 interval 제거
      setTextStep(0); // 로딩 애니메이션 초기화
      alert("gpt가 아파요 🥲\n 잠시후에 다시 해주세요!!");
    }
  };

  return (
    <>
      {textStep !== 0 ? (
        <Loading textStep={textStep} />
      ) : (
        <div className="p-2">
          <TitleContainer title="당신의 고민을 적어주세요." />
          <div className="max-w-sm px-2 mx-auto">
            <Textarea
              id="input"
              value={worry}
              onChange={handleChange}
              placeholder="고민을 자유롭게 적어주세요."
            />
            <div className="grid grid-cols-2 gap-4 mt-3">
              <Button
                text="Cancel"
                bgColor="bg-gray-400"
                onPress={() => decrease()}
              />
              <Button text="Ask" bgColor="bg-green-400" onPress={handleAsk} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepFour;
