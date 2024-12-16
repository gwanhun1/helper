import useStepStore from "../../../store/stepStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import Textarea from "../../molecules/Textarea";
import { useState } from "react";
import Loading from "./Loading";
import useWorryStore from "../../../store/worryStore";
import useCounselingPrompt from "../../../hooks/useCounselingPrompt";
import useUpdateUserCount from "../../../hooks/useUpdateUserCount";
import useUserStore from "../../../store/userStore";
import { useNavigate } from "react-router-dom";

const LOADING_INTERVAL = 1000;
const MAX_LOADING_STEPS = 5;

interface LoadingState {
  isLoading: boolean;
  step: number;
}

const resetLoadingState = (
  setLoadingState: React.Dispatch<React.SetStateAction<LoadingState>>
) => {
  setLoadingState({ isLoading: false, step: 0 });
};

const startLoading = (
  setLoadingState: React.Dispatch<React.SetStateAction<LoadingState>>
) => {
  setLoadingState({ isLoading: true, step: 0 });
  return setInterval(() => {
    setLoadingState((prev) => ({
      ...prev,
      step: (prev.step + 1) % MAX_LOADING_STEPS,
    }));
  }, LOADING_INTERVAL);
};

const StepFour = () => {
  const { increase, decrease } = useStepStore();
  const { setWorry, worry, how, who } = useWorryStore();
  const { fetchResponse } = useCounselingPrompt();
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    step: 0,
  });
  const { updateUserCount } = useUpdateUserCount();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorry(e.target.value);
  };

  const handleAsk = async () => {
    const interval = startLoading(setLoadingState);
  
    if (!worry || worry.length === 0) {
      alert("고민을 적어주세요!");
      resetLoadingState(setLoadingState); 
      clearInterval(interval); 
      return; }
  
    if (user?.uid && user?.count) {
      try {
        alert("gpt가 아파요 \n 잠시후에 다시 해주세요!!");
        // await fetchResponse();
        // increase();
        // updateUserCount({ uId: user.uid, count: user.count - 1 });
      } catch {
        alert("gpt가 아파요 \n 잠시후에 다시 해주세요!!");
      } finally {
        resetLoadingState(setLoadingState);
        clearInterval(interval);
      }
    } else {
      alert("오늘 하루 힘드셨나요?? 🥲 \n 추가 답변을 원하면 결제가 필요해요!!");
      navigate("/credit");
    }
  };

  const renderContent = () => {
    if (loadingState.isLoading) {
      return <Loading textStep={loadingState.step} />;
    }

    return (
      <div className="p-2">
        <div className="px-2 pb-2 mb-4 border-b border-gray-300">
          <Title>당신의 고민을 적어주세요.</Title>
          <div className=" flex">
            <Text className="mt-2 ml-2 text-xs text-gray-600">
              고민을 자유롭게 적어주세요.
            </Text>

            <Text className="ml-1 mt-2 text-xs text-gray-400">
              ({who}/{how})
            </Text>
          </div>
        </div>

        <div className="max-w-sm px-2 mx-auto">
          <Textarea
            id="input"
            value={worry}
            onChange={handleChange}
            placeholder="고민을 자유롭게 적어주세요."
          />
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Button text="Back" bgColor="bg-gray-400" onPress={decrease} />
            <Button
              text="Ask"
              bgColor="bg-green"
              onPress={handleAsk}
              className="sparkle-effect"
            />
          </div>
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default StepFour;
