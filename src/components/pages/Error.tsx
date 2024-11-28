import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="">잘못된 요청입니다.</div>
      <Button size="lg" onPress={handleClick} text="Home으로 돌아가기." />
    </div>
  );
};

export default Error;
