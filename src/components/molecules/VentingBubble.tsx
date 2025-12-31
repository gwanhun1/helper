import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import BubbleCard from "../atoms/BubbleCard";

interface Bubble {
  id: number;
  text: string;
  x: number;
  intensity: "normal" | "high";
}

interface VentingBubbleProps {
  bubble: Bubble;
  onRemove: () => void;
}

const VentingBubble = ({ bubble, onRemove }: VentingBubbleProps) => {
  const [isFlying, setIsFlying] = useState(false);
  const isHigh = bubble.intensity === "high";

  useEffect(() => {
    const startFlight = setTimeout(() => setIsFlying(true), 200);
    const cleanup = setTimeout(onRemove, 5000);

    return () => {
      clearTimeout(startFlight);
      clearTimeout(cleanup);
    };
  }, [onRemove]);

  const handlers = useSwipeable({
    onSwipedUp: () => setIsFlying(true),
    trackMouse: true,
  });

  return (
    <motion.div
      {...handlers}
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 380,
        x: `calc(-50% + ${bubble.x}px)`,
      }}
      animate={
        isFlying
          ? {
              y: -900,
              x: isHigh
                ? [
                    `calc(-50% + ${bubble.x}px)`,
                    `calc(-50% + ${bubble.x - 140}px)`,
                    `calc(-50% + ${bubble.x + 140}px)`,
                    `calc(-50% + ${bubble.x - 90}px)`,
                    `calc(-50% + ${bubble.x + 90}px)`,
                    `calc(-50% + ${bubble.x}px)`,
                  ]
                : [
                    `calc(-50% + ${bubble.x}px)`,
                    `calc(-50% + ${bubble.x - 60}px)`,
                    `calc(-50% + ${bubble.x + 60}px)`,
                    `calc(-50% + ${bubble.x - 40}px)`,
                  ],
              opacity: 0,
              scale: 0.1,
              rotate: isHigh ? [0, 15, -15, 0] : 0,
              transition: {
                y: { duration: 4.8, ease: "easeInOut" },
                x: { duration: 4.8, repeat: 0, ease: "easeInOut" },
                opacity: { duration: 1.6, delay: 3.2 },
                scale: { duration: 4.8 },
                rotate: { duration: 4.8 },
              },
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 120, damping: 12 },
            }
      }
      className="absolute bottom-1/4 left-1/2 z-20 pointer-events-auto cursor-grab active:cursor-grabbing"
    >
      <BubbleCard text={bubble.text} />
    </motion.div>
  );
};

export default VentingBubble;
export type { Bubble };
