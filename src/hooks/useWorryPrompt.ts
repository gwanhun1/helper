import { useState, useEffect, useCallback, useMemo } from "react";
import { whoList, howList } from "../constants/worryPrompts";
import useWorryStore from "../store/worryStore";
import { useNavigate } from "react-router-dom";
import useStepStore from "../store/stepStore";

export const useWorryPrompt = () => {
  const navigate = useNavigate();
  const { setStep } = useStepStore();
  const { setWho, setHow } = useWorryStore();

  const [indices, setIndices] = useState({ who: 0, how: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateIndices = useCallback(() => {
    setIsTransitioning(true);
    setIndices((prev) => ({
      who: (prev.who + 1) % whoList.length,
      how: (prev.how + 1) % howList.length,
    }));
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateIndices, 2000);
    return () => clearInterval(interval);
  }, [updateIndices]);

  const currentPrompts = useMemo(
    () => ({
      who: whoList[indices.who],
      how: howList[indices.how],
    }),
    [indices]
  );

  const handleSelection = useCallback(() => {
    if (isTransitioning) return;

    setWho(currentPrompts.who.who);
    setHow(currentPrompts.how.how);

    setTimeout(() => {
      navigate("/worry");
      setStep(4);
    }, 50);
  }, [currentPrompts, isTransitioning, navigate, setHow, setStep, setWho]);

  return {
    currentPrompts,
    isTransitioning,
    handleSelection,
  };
};
