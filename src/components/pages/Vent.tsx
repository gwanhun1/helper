import React, { useState, useRef, useEffect } from "react";
import VentTemplate from "../templates/VentTemplate";
import VentInput from "../organisms/VentInput";
import VentingBubble, { Bubble } from "../molecules/VentingBubble";

const Vent = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [inputValue, setInputValue] = useState("");
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef(false);

  const [isVenting, setIsVenting] = useState(false);
  const ventingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkIntensity = (text: string): "normal" | "high" => {
    const highIntensityPatterns = /씨발|존나|개|병신|미친|[!]{2,}|[?]{2,}/i;
    return highIntensityPatterns.test(text) ? "high" : "normal";
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const intensity = checkIntensity(text);
    const newBubble: Bubble = {
      id: nextId.current++,
      text,
      x: (Math.random() - 0.5) * 120,
      intensity,
    };

    setIsVenting(true);
    if (ventingTimeoutRef.current) clearTimeout(ventingTimeoutRef.current);
    ventingTimeoutRef.current = setTimeout(() => {
      setIsVenting(false);
    }, 3500);

    setBubbles((prev) => [...prev, newBubble]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const removeBubble = (id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  useEffect(() => {
    return () => {
      if (ventingTimeoutRef.current) clearTimeout(ventingTimeoutRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComposingRef.current) return;
    handleSend();
  };

  return (
    <VentTemplate
      isVenting={isVenting}
      inputElement={
        <VentInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleSubmit}
          inputRef={inputRef}
          isComposingRef={isComposingRef}
        />
      }
      bubblesElement={bubbles.map((bubble) => (
        <VentingBubble
          key={bubble.id}
          bubble={bubble}
          onRemove={() => removeBubble(bubble.id)}
        />
      ))}
    />
  );
};

export default Vent;
