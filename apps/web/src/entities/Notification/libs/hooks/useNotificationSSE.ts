import { useEffect } from "react";
import useNotificationStore from "../../model/store/notificationStore";
import { AXIOS_BASE_URL } from "../../../../shared/constants/api";

export const useNotificationSSE = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  useEffect(() => {
    const eventSource = new EventSource(
      `${AXIOS_BASE_URL}/api/v1/notifications/subscribe`
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      addNotification(newNotification);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setTimeout(() => {
        // SSE 재연결 로직
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, [addNotification]);
};
