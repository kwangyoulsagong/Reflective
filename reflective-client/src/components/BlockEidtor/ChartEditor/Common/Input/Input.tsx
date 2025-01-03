interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "bg-transparent outline-none text-center";
  const classes = [baseStyles, fullWidth ? "w-full" : "", className].join(" ");

  return <input className={classes} {...props} />;
};
export default Input;
