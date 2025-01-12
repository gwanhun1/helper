import React, { ReactNode } from "react";
import Text from "../atoms/Text";

interface IconRowProps {
  icon: ReactNode;
  mainText: ReactNode;
  subText?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const IconRow = ({
  icon,
  mainText,
  subText: children,
  onClick,
  className = "",
}: IconRowProps) => {
  return (
    <div
      className={`flex items-center gap-4 py-2 ${
        onClick ? "cursor-pointer hover:bg-gray-50" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <div>
            {typeof mainText === "string" ? (
              <Text variant="h3" weight="bold" color="primary">
                {mainText}
              </Text>
            ) : (
              mainText
            )}
            {children && (
              <div className="mt-0.5">
                {typeof children === "string" ? (
                  <Text variant="small" color="secondary">
                    {children}
                  </Text>
                ) : (
                  children
                )}
              </div>
            )}
          </div>
          {onClick && (
            <Text variant="small" color="tertiary" className="ml-2">
              &gt;
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default IconRow;
