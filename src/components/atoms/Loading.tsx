import Lottie from "lottie-react";
import loading from "./loading.json";

const Loading = () => {
  return (
      <Lottie
        animationData={loading}
        style={{ height: "300px", margin: "60px" }}
      />
  );
};

export default Loading;
