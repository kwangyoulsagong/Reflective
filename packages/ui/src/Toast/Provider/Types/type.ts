import { ToastType } from "../../../Toast/Types/type";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}
