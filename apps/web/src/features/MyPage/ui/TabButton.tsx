import React from "react";

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 pb-2 border-b-2 ${
        isActive ? "border-blue-500 text-blue-500" : "border-transparent"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default TabButton;
