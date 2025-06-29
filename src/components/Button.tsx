

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";

  const variantClasses =
    variant === "ghost"
      ? "bg-transparent hover:bg-gray-200 text-gray-700"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

