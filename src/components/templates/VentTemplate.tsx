import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VentBackground from "../organisms/VentBackground";
import Grandpa from "../molecules/Grandpa";

interface VentTemplateProps {
  isVenting: boolean;
  backgroundElements?: ReactNode;
  inputElement: ReactNode;
  bubblesElement: ReactNode;
}

const VentTemplate = ({
  isVenting,
  inputElement,
  bubblesElement,
}: VentTemplateProps) => {
  return (
    <div className="flex overflow-hidden relative flex-col w-full h-full bg-gradient-to-b to-white from-amber-100/60 via-emerald-50/40">
      <VentBackground isVenting={isVenting} />

      <div className="relative z-20 px-5 pt-5 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">감정 풀기</h1>
        <p className="mt-2 text-sm text-slate-700">
          서버에 보내지 않고, 화면에서만 잠시 머물러요.
        </p>
      </div>
      <div className="flex relative z-20 flex-1 items-end w-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!isVenting && (
            <motion.div
              key="grandpa-area"
              initial={{ opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex absolute inset-0 justify-center items-end px-6"
            >
              <Grandpa />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{bubblesElement}</AnimatePresence>
      </div>

      {inputElement}
    </div>
  );
};

export default VentTemplate;
