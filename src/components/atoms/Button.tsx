import { motion } from "framer-motion";

type ButtonType = {
  text: string;
  color?: string;
  fontSize?: number;
  bgColor?: string;
  onPress?: () => void;
  outline?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  disabled?: boolean;
};

const Button = ({
  text,
  color,
  fontSize,
  bgColor,
  onPress,
  outline,
  size = "md",
  className,
  disabled
}: ButtonType) => {
  const sizeClasses = {
    xs: "px-2 py-1 text-[10px]",
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
    xl: "px-9 py-4 text-lg",
    "2xl": "px-11 py-5 text-xl",
    "3xl": "px-13 py-6 text-2xl",
  };

  return (
    <motion.button
      onClick={onPress}
      whileHover={disabled ? {} : { scale: 1.02, translateY: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
      className={`flex items-center justify-center rounded-2xl transition-all duration-300
            ${bgColor || (outline ? "bg-white/20" : "bg-green")} 
            ${color || (outline ? "text-gray-500" : "text-white")} 
            ${outline ? "border border-white/40 backdrop-blur-md shadow-sm" : "shadow-md shadow-green/10"} 
            ${sizeClasses[size]} 
            ${disabled ? "opacity-50 cursor-not-allowed grayscale" : "hover:brightness-105"}
            ${className || ""}`}
      style={{
        fontSize: fontSize || undefined,
        fontWeight: 600
      }}
    >
      <span className="truncate relative z-10">{text}</span>
    </motion.button>
  );
};

export default Button;
