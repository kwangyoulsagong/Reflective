import { ReactNode } from "react";
type styles =
  | "primary"
  | "secondary"
  | "auth"
  | "favorite"
  | "edit"
  | "delete"
  | "like";

interface ButtonProps {
  children: ReactNode;
  variant?: styles;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  icon,
  className = "",
}: ButtonProps) => {
  const variantsButton = {
    primary:
      "w-[120px] sm:w-[130px] md:w-[140px] h-[35px] sm:h-[38px] md:h-[40px] border-[2px] sm:border-[3px] border-primary rounded-[20px] box-border text-primary text-sm sm:text-base",
    secondary:
      "bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold",
    auth: "bg-primary rounded-[20px] w-[340px] h-[40px] text-white",
    favorite:
      "w-[60px] sm:w-[80px] md:w-[100px] h-[35px] sm:h-[38px] md:h-[40px] border-[2px] sm:border-[3px] border-primary rounded-[20px] text-primary text-sm sm:text-base transition-colors hover:bg-primary hover:text-white",
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
