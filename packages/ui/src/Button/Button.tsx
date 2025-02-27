import { ReactNode } from "react";
type styles =
  | "primary"
  | "secondary"
  | "auth"
  | "favorite"
  | "edit"
  | "delete"
  | "like";

export interface ButtonProps {
  children: ReactNode;
  variant?: styles;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  icon,
  className = "",
  disabled = false,
}: ButtonProps) => {
  const variantsButton = {
    primary:
      "px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors",
    secondary:
      "bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold",
    auth: "bg-primary rounded-[20px] w-[300px] h-[40px] text-white font-bold",
    favorite:
      "px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors",
    edit: "flex items-center gap-1 px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors",
    delete:
      "flex items-center gap-1 px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 transition-colors",
    like: "w-6 h-6 sm:w-[30px] sm:h-[30px] transition-transform hover:scale-110",
  };

  if (variant === "like") {
    return (
      <button
        onClick={onClick}
        className={`${variantsButton[variant]} ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${variantsButton[variant]} ${className}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
