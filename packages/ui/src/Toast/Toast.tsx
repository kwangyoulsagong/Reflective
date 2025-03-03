import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ToastProps } from "./Types/type";

export const Toast = ({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-l-4 border-green-500";
      case "error":
        return "bg-red-50 border-l-4 border-red-500";
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "info":
      default:
        return "bg-blue-50 border-l-4 border-blue-500";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
      default:
        return "text-blue-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "!";
      case "info":
      default:
        return "i";
    }
  };

  return (
    <div
      className={`fixed right-4 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } shadow-lg rounded-md overflow-hidden max-w-md transition-all duration-300 ease-in-out ${getBackgroundColor()}`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center p-4">
        <div
          className={`flex-shrink-0 ${getIconColor()} text-lg font-bold mr-3`}
        >
          {getIcon()}
        </div>
        <div className="flex-grow">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
