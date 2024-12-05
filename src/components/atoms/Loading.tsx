import Lottie from "lottie-react";
import tree from "./tree.json";

const Loading = () => {
  return (
      <Lottie
        animationData={tree}
        style={{ height: "220px", margin: "60px" }}
      />
  );
};

export default Loading;
