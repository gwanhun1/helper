import { useState } from "react";
import Textarea from "../molecules/Textarea";
import { AiFillHeart } from "react-icons/ai";
import Button from "../atoms/Button";

type TextareaContainerProps = {
  setSelect: React.Dispatch<React.SetStateAction<number>>;
};

const TextareaContainer = ({ setSelect }: TextareaContainerProps) => {
  const [value, setValue] = useState("");
  const [isRed, setIsRed] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // 텍스트 영역의 나타나는/사라지는 상태 관리

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const toggleHeartColor = () => {
    setIsRed(!isRed); // Simplified state toggle
  };

  const handleClose = () => {
    setIsVisible(false); // 텍스트 영역을 숨깁니다.
    setSelect(-1); // 부모 컴포넌트에서 select를 -1로 설정
  };

  return (
    <>
      <div className="flex justify-end">
        <AiFillHeart
          className={`my-2 cursor-pointer transition-colors duration-300 ${
            isRed ? "text-red-700" : "text-gray-400"
          }`}
          onClick={toggleHeartColor}
        />
      </div>

      {/* Textarea에 애니메이션 추가 */}
      <Textarea
        id="input"
        value={value}
        onChange={handleChange}
        placeholder="고민을 자유롭게 적어주세요."
        className={`transition-all duration-500 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } border-2 p-2 rounded-md ${
          value ? "border-blue-500" : "border-gray-300"
        } focus:outline-none focus:border-blue-600 ${
          isRed ? "bg-red-50" : "bg-white"
        }`}
      />

      <div className="flex justify-end mt-2">
        <Button
          onPress={handleClose}
          text="닫기"
          bgColor="bg-red-500"
          size="sm"
        />
      </div>
    </>
  );
};

export default TextareaContainer;
