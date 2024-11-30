import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import tree from "./tree.json";

const Loading = () => {
  const [viewportHeight, setViewportHeight] = useState("60vh");

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  return (
    <div style={{ height: viewportHeight }}>
      <Lottie
        animationData={tree}
        style={{ height: "220px", margin: "60px" }}
      />
    </div>
  );
};

export default Loading;
