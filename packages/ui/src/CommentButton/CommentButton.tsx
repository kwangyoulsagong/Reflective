interface buttonProps {
  variant?: VariantType;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
type VariantType = "primary" | "sm-primary" | "secondary" | "cancel" | "action";
export const CommentButton = ({
  variant = "primary",
  onClick,
  children,
  className = "",
}: buttonProps) => {
  const variants: Record<VariantType, string> = {
    primary:
      "px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-colors",
    "sm-primary":
      "px-3 py-1 text-sm text-white bg-primary rounded-full hover:bg-primary-dark transition-colors",
    secondary:
      "px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors",
    cancel:
      "px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",
    action:
      "text-sm text-gray-500 flex items-center hover:text-primary transition-colors",
  };
  return (
    <button className={`${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
