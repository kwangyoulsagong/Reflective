export const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: any) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    className={className}
  />
);
