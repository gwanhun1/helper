type ButtonType = {
  text: string;
  color?: string;
  fontSize?: number;
  bgColor?: string;
  onPress?: () => void;
  outline?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
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
}: ButtonType) => {
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
    "2xl": "px-10 py-5 text-2xl",
    "3xl": "px-12 py-6 text-3xl",
  };

  return (
    <button
      onClick={onPress}
      className={`flex items-center justify-center rounded-lg shadow-lg 
            ${bgColor || "bg-green-500"} 
            ${color || "text-white"} 
            ${outline ? "border border-gray-300" : ""} 
            ${sizeClasses[size]} 
            hover:bg-opacity-80 active:bg-opacity-60 focus:outline-none 
            transition-all duration-300
            ${className || ""}`}
      style={{
        fontSize: fontSize || undefined,
        minWidth:
          size === "xs"
            ? "40px"
            : size === "sm"
            ? "50px"
            : size === "md"
            ? "60px"
            : size === "lg"
            ? "70px"
            : size === "xl"
            ? "80px"
            : size === "2xl"
            ? "90px"
            : "100px",
        maxWidth:
          size === "xs"
            ? "200px"
            : size === "sm"
            ? "250px"
            : size === "md"
            ? "300px"
            : size === "lg"
            ? "350px"
            : size === "xl"
            ? "400px"
            : size === "2xl"
            ? "450px"
            : "500px",
      }}
    >
      <span className="truncate">{text}</span>
    </button>
  );
};

export default Button;
