import React from "react";
export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`w-[300px] h-[40px] bg-input outline-none indent-4 text-sm bg-input`}
    />
  );
};
