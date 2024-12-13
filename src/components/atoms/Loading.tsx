import Lottie from "lottie-react";
import loading from "./loading.json";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <Lottie
      animationData={loading}
      className={className}
    />
  );
};

export default Loading;
