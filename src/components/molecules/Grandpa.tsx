import React from "react";
import { motion } from "framer-motion";

const Grandpa = () => {
  return (
    <div className="flex relative justify-center items-center w-full max-w-md">
      <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-b from-amber-200/28 via-green-100/16 to-transparent blur-2xl" />
      <motion.img
        src="/human.png"
        alt="할아버지"
        draggable={false}
        animate={{ y: [0, -6, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: "easeInOut",
        }}
        className="relative pointer-events-none translate-y-8 w-[220px] max-w-[70vw] select-none drop-shadow-[0_22px_34px_rgba(0,0,0,0.18)] md:w-[280px] md:translate-y-10"
      />
    </div>
  );
};

export default Grandpa;
