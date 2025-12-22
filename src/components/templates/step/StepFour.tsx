import { useState } from "react";
import useStepStore from "../../../store/stepStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import Textarea from "../../molecules/Textarea";
import Loading from "./Loading";
import useWorryStore from "../../../store/worryStore";
import useCounselingPrompt from "../../../hooks/useCounselingPrompt";
import useUpdateUserCount from "../../../hooks/useUpdateUserCount";
import useUserStore from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import Filter from "badwords-ko";
import { motion, AnimatePresence } from "framer-motion";
import { ChangeEvent } from "react";

const StepFour = () => {
  const { decrease } = useStepStore();
  const { setWorry, worry, how, who } = useWorryStore();
  const { fetchResponse } = useCounselingPrompt();
  const [loadingState, setLoadingState] = useState({ isLoading: false, step: 0 });
  const { decreaseUserCount } = useUpdateUserCount();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);
  const filter = new Filter();

  const handleAsk = async () => {
    if (isRequesting) return;
    setIsRequesting(true);
    setLoadingState({ isLoading: true, step: 0 });

    if (!worry || worry.trim().length === 0) {
      alert("당신의 소중한 고민을 들려주세요.");
      setLoadingState({ isLoading: false, step: 0 });
      setIsRequesting(false);
      return;
    }

    if (user?.uid && user?.count) {
      try {
        await fetchResponse();
        await decreaseUserCount({ uId: user.uid, count: user.count });
      } catch {
        alert("잠시 후 다시 시도해주세요.");
      } finally {
        setLoadingState({ isLoading: false, step: 0 });
        setIsRequesting(false);
      }
    } else {
      alert("추가 상담을 위해서는 결제가 필요합니다.");
      navigate("/credit");
      setIsRequesting(false);
    }
  };

  if (loadingState.isLoading) {
    return <Loading textStep={loadingState.step} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-transparent px-6 pt-6"
    >
      <div className="pb-6">
        <Title>당신의 마음을 적어주세요</Title>
        <div className="flex items-center gap-2 mt-2">
          <Text variant="body" color="secondary" className="font-medium">
            비밀은 지켜질 거예요. 편안하게 작성해 주세요.
          </Text>
          <div className="px-2 py-0.5 bg-gray-100 rounded-md">
            <Text className="!text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              {who} · {how}
            </Text>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="relative flex-1 bg-gray-50 rounded-3xl p-4 overflow-hidden border border-gray-100 shadow-inner">
          <Textarea
            id="input"
            value={worry}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setWorry(filter.clean(e.target.value))}
            placeholder="어떤 고민이 있으신가요? 자세히 적을수록 더 깊은 조언을 드릴 수 있어요."
            className="!bg-transparent !border-none !shadow-none !p-2 !ring-0 text-gray-700 leading-relaxed text-sm h-full"
            minHeight="100%"
          />
        </div>

        <div className="px-6 py-4 bg-transparent mt-6 -mx-6 mb-[-24px] z-20">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              text="이전으로" 
              bgColor="bg-white/40" 
              color="text-gray-600"
              onPress={decrease} 
              className="!rounded-2xl h-14"
              outline
            />
            <Button
              text="조언 구하기"
              bgColor="bg-green"
              onPress={handleAsk}
              className="sparkle-effect !rounded-2xl h-14 !shadow-green/20"
              disabled={!worry.trim()}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepFour;
