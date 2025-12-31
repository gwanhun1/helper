import React from "react";
import { motion } from "framer-motion";
import BubbleCard from "../atoms/BubbleCard";

interface VentBackgroundProps {
  isVenting: boolean;
}

const leftDecorativeTexts = [
  "아니 김과장이 나한테...",
  "너무 화나 아 진짜,,,,",
  "🤬",
  "🖕🖕🖕🖕🖕🖕",
];
const rightDecorativeTexts = [
  "에라이 더러워서,,",
  "ㅡㅡ",
  "욕 나오네",
  "🤬🤬🤬🤬🤬🤬🤬",
];

const VentBackground = ({ isVenting }: VentBackgroundProps) => {
  return (
    <>
      <div className="flex overflow-hidden absolute inset-0 z-0 justify-center items-end pointer-events-none">
        <div
          className="absolute inset-0 z-[-1] opacity-60"
          style={{
            backgroundImage: "url('/bamboo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#0b0d12 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl bg-amber-200/40" />
        <div className="absolute -top-40 right-[-80px] h-[520px] w-[520px] rounded-full bg-green-200/35 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(255,211,106,0.38) 0%, rgba(255,211,106,0) 35%, rgba(255,211,106,0) 65%, rgba(255,211,106,0.16) 100%)",
          }}
        />

        <div className="absolute inset-y-0 left-[-10px] w-[150px] bg-gradient-to-r from-green-900/10 to-transparent" />
        <div className="absolute inset-y-0 right-[-10px] w-[170px] bg-gradient-to-l from-green-900/10 to-transparent" />
      </div>

      <div className="absolute inset-0 z-100 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            initial={{ x: -20, y: -20, opacity: 0 }}
            animate={{
              x: ["0vw", "100vw"],
              y: ["0vh", "100vh"],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
            className="absolute w-5 h-3 bg-green-600/80 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] pointer-events-none"
            style={{ top: `${Math.random() * 80}%`, left: "-5%" }}
          />
        ))}
      </div>

      <motion.div
        animate={{ opacity: isVenting ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {[...Array(4)].map((_, i) => {
          const text = leftDecorativeTexts[i % leftDecorativeTexts.length];
          return (
            <motion.div
              key={`bubble-left-${i}`}
              initial={{ y: "110vh", opacity: 0, scale: 0.4, rotate: 0 }}
              animate={{
                y: "-20vh",
                x: [0, -30, 30, -20, 20, 0],
                opacity: [0.1, 0.7, 0.7, 0.2],
                scale: [0.4, 0.6, 0.5],
                rotate: [-8, 8, -8, 8, 0],
              }}
              transition={{
                y: {
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  delay: i * 3.5,
                  ease: "linear",
                },
                x: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  delay: i * 3.5,
                  times: [0, 0.1, 0.8, 1],
                },
              }}
              className="flex absolute justify-center items-center pointer-events-none"
              style={{
                left: `${8 + i * 5}%`,
              }}
            >
              <BubbleCard
                text={text}
                className="scale-75 origin-bottom opacity-70"
              />
            </motion.div>
          );
        })}

        {[...Array(4)].map((_, i) => {
          const text = rightDecorativeTexts[i % rightDecorativeTexts.length];
          return (
            <motion.div
              key={`bubble-right-${i}`}
              initial={{ y: "110vh", opacity: 0, scale: 0.4, rotate: 0 }}
              animate={{
                y: "-20vh",
                x: [0, 30, -30, 20, -20, 0],
                opacity: [0.2, 0.5, 0.6, 0.4],
                scale: [0.4, 0.6, 0.5],
                rotate: [8, -8, 8, -8, 0],
              }}
              transition={{
                y: {
                  duration: 11 + i * 2.5,
                  repeat: Infinity,
                  delay: i * 4,
                  ease: "linear",
                },
                x: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 11 + i * 2.5,
                  repeat: Infinity,
                  delay: i * 4,
                  times: [0, 0.1, 0.8, 1],
                },
              }}
              className="flex absolute justify-center items-center pointer-events-none"
              style={{
                right: `${8 + (i * i)}%`,
              }}
            >
              <BubbleCard
                text={text}
                className="scale-75 origin-bottom opacity-70"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default VentBackground;
