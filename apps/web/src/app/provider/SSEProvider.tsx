import React, { useEffect } from "react";
import { useNotificationSSE } from "../../entities/Notification/libs/hooks/useNotificationSSE";

interface SSEProviderProps {
  children: React.ReactNode;
}

export const SSEProvider: React.FC<SSEProviderProps> = ({ children }) => {
  const { isConnected, reconnect } = useNotificationSSE();

  // 명시적으로 SSE 연결 시작 및 유지
  useEffect(() => {
    reconnect();
  }, [isConnected, reconnect]);

  return <>{children}</>;
};
