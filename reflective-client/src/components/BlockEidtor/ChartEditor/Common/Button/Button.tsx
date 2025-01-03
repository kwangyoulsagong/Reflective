import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center transition-colors rounded";
  const sizeStyles = {
    sm: "p-1 text-sm",
    md: "p-2 text-base",
    lg: "p-3 text-lg",
  };
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "text-blue-500 hover:bg-blue-50",
    danger: "text-red-500 hover:bg-red-50",
    ghost: "hover:bg-gray-100",
  };

  const classes = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={classes} {...props}>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 ml-2" />}
    </button>
  );
};
export default Button;
