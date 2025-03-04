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

  // 토스 스타일 토스트 설정
  const getToastStyles = () => {
    const baseStyles = "bg-white border border-gray-100 w-[200px]";

    switch (type) {
      case "success":
        return {
          container: `${baseStyles}`,
          icon: "toast-success",
          iconChar: "✓",
          title: "성공",
        };
      case "error":
        return {
          container: `${baseStyles}`,
          icon: "text-red-500",
          iconChar: "✕",
          title: "오류",
        };
      case "warning":
        return {
          container: `${baseStyles}`,
          icon: "text-amber-500",
          iconChar: "!",
          title: "주의",
        };
      case "info":
      default:
        return {
          container: `${baseStyles}`,
          icon: "text-blue-500",
          iconChar: "i",
          title: "안내",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`fixed top-0 right-0 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } shadow-lg rounded-xl overflow-hidden max-w-md transition-all duration-300 ease-in-out ${styles.container}`}
      style={{ zIndex: 9999 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <span className={`${styles.icon} mr-2 text-lg`}>
              {styles.iconChar}
            </span>
            <span className="font-semibold text-sm text-gray-900">
              {styles.title}
            </span>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose(id), 300);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-700 pl-6">{message}</p>
      </div>
    </div>
  );
};
