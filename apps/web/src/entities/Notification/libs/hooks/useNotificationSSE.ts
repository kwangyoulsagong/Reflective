import { useCallback, useEffect, useRef, useState } from "react";
import useNotificationStore from "../../model/store/notificationStore";
import {
  ACCESS_TOKEN_KEY,
  AXIOS_BASE_URL,
} from "../../../../shared/constants/api";

export const useNotificationSSE = () => {
  const { addNotification, fetchNotifications } = useNotificationStore();
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connectSSE = useCallback(() => {
    // 기존 연결 있으면 먼저 닫기
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    fetchNotifications();

    const url = new URL(`${AXIOS_BASE_URL}/api/v1/notifications/subscribe`);
    url.searchParams.append(
      "authorization",
      `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    );

    const eventSource = new EventSource(url.toString(), {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log("SSE connection established");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        addNotification(newNotification);
      } catch (error) {
        console.error("Error parsing notification:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
      setIsConnected(false);
    };

    eventSourceRef.current = eventSource;

    return eventSource;
  }, [addNotification, fetchNotifications]);

  useEffect(() => {
    const eventSource = connectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [connectSSE]);

  return { isConnected };
};
