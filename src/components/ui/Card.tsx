import type { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  className?: string;
  [key: string]: any;
}

export const Card: FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-xl overflow-hidden transition-all duration-300 pt-5";
  const variantClasses = {
    default: "bg-gray-800/50 backdrop-blur-md border border-purple-500/20",
    elevated:
      "bg-gray-800/70 backdrop-blur-md border border-purple-500/30 shadow-2xl",
    outlined: "bg-transparent border-2 border-purple-500/40",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => (
  <h3
    className={`text-xl font-semibold text-white mb-2 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => (
  <p className={`text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
