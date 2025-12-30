import useStepStore from "../../../store/stepStore";
import useWorryStore from "../../../store/worryStore";
import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiShare2, FiLock, FiUnlock } from "react-icons/fi";
import { toast } from "react-hot-toast";

const StepFive = () => {
  const { reset, decrease } = useStepStore();
  const { response, reset: resetWorry, isOpen, setIsOpen } = useWorryStore();
  const navigate = useNavigate();

  const handleReset = () => {
    resetWorry();
    reset();
  };

  const handleViewInCommunity = () => {
    resetWorry();
    reset();
    toast.success("커뮤니티에서 다른 사람들의 이야기도 들어보세요!");
    navigate("/advice");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-transparent px-6 pt-6 pb-8"
    >
      <div className="pb-6">
        <Title>당신을 위한 조언이 도착했어요</Title>
        <Text variant="body" color="secondary" className="mt-2 font-medium">
          이 메시지가 당신의 마음에 작은 위로가 되길 바라요.
        </Text>
      </div>

      <div className="flex-1 overflow-y-auto px-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100/50 shadow-sm relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100/30 rounded-full blur-2xl -mr-10 -mt-10" />

          <div className="relative z-10 text-gray-700 leading-loose text-[15px] whitespace-pre-wrap font-medium">
            {response}
          </div>
        </motion.div>

        {/* 커뮤니티 공유 안내 및 설정 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-4 p-4 rounded-2xl border transition-all duration-300 ${
            isOpen
              ? "bg-green-50/50 border-green-100/50"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`flex items-center gap-2 font-semibold text-sm ${
                isOpen ? "text-green-700" : "text-gray-600"
              }`}
            >
              {isOpen ? <FiUnlock size={16} /> : <FiLock size={16} />}
              <span>
                {isOpen ? "커뮤니티에 익명으로 공유됨" : "나만 보기 (비공개)"}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${
                isOpen
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              설정 변경
            </button>
          </div>
          <p
            className={`text-xs leading-relaxed ${
              isOpen ? "text-green-600/80" : "text-gray-500"
            }`}
          >
            {isOpen
              ? "당신의 고민이 익명으로 커뮤니티에 공유되었어요. 다른 분들의 따뜻한 응원을 받아보세요!"
              : "이 고민은 커뮤니티에 공개되지 않고 오직 당신의 숲에만 남게 됩니다."}
          </p>
        </motion.div>
      </div>

      <div className="px-6 py-4 bg-transparent -mx-6 -mb-8 mt-8 z-20">
        <div className="grid grid-cols-2 gap-4">
          <Button
            text="이전으로"
            bgColor="bg-white/40"
            color="text-gray-600"
            onPress={() => decrease()}
            className="h-14 !rounded-2xl"
            outline
          />
          <Button
            className="sparkle-effect h-14 !rounded-2xl !shadow-green/20"
            text="다시 심기"
            bgColor="bg-green"
            onPress={handleReset}
          />
        </div>

        {/* 커뮤니티에서 보기 버튼 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleViewInCommunity}
          className="w-full mt-3 py-3 text-sm text-green-600 font-medium hover:bg-green-50 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <FiShare2 size={16} />
          커뮤니티에서 보기
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StepFive;
