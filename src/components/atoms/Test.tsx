interface TextProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return <p className={`${sizeClasses[size]} ${className}`}>{children}</p>;
};
