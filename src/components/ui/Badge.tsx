import type { FC } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "gradient" | "black";
  className?: string;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300";

  const variantClasses = {
    default: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    secondary: "bg-gray-600/50 text-gray-300",
    outline: "border border-purple-500/50 text-purple-300",
    gradient:
      "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30",
    black:
      "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-black/70",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
