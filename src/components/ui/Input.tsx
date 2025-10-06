import type { FC } from "react";

interface InputProps {
  className?: string;
  error?: boolean;
  [key: string]: any;
}

export const Input: FC<InputProps> = ({
  className = "",
  error = false,
  ...props
}) => {
  const baseClasses =
    "w-full px-4 py-3 rounded-lg bg-gray-700/50 border text-white placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50";
  const borderClasses = error
    ? "border-red-500/50 focus:border-red-500"
    : "border-purple-500/30 focus:border-purple-500";

  return (
    <input
      className={`${baseClasses} ${borderClasses} ${className}`}
      {...props}
    />
  );
};
