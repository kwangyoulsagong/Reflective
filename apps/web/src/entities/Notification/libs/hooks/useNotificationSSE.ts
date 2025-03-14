import { useCallback, useEffect, useRef, useState } from "react";
import useNotificationStore from "../../model/store/notificationStore";
import {
  ACCESS_TOKEN_KEY,
  AXIOS_BASE_URL,
} from "../../../../shared/constants/api";
import postNewToken from "../../../../shared/api/postNewToken";

export const useNotificationSSE = () => {
  const { addNotification, fetchNotifications } = useNotificationStore();
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  // 토큰 리프레시 처리 함수
  const handleTokenRefresh = async () => {
    try {
      await postNewToken();

      // 기존 연결 닫기
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      // 재연결
      setTimeout(connectSSE, 1000);
      return true;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      return false;
    }
  };

  const connectSSE = useCallback(async () => {
    // 기존 연결 있으면 먼저 닫기
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // 초기 알림 불러오기
    try {
      await fetchNotifications();
    } catch (error) {
      // 401 에러일 경우 토큰 리프레시 시도
      if (error instanceof Error && error.message.includes("401")) {
        try {
          await postNewToken();
          await fetchNotifications();
        } catch (refreshError) {
          console.error("토큰 갱신 실패:", refreshError);
          return null;
        }
      }
    }

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      console.error("인증 토큰이 없습니다.");
      return null;
    }

    const url = new URL(`${AXIOS_BASE_URL}/api/v1/notifications/subscribe`);
    url.searchParams.append("authorization", `Bearer ${token}`);

    const eventSource = new EventSource(url.toString(), {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // 에러 타입 처리
        if (data.type === "ERROR") {
          console.error("SSE 연결 에러:", data.message);

          // 401 에러일 경우 토큰 리프레시 시도
          if (
            data.message.includes("401") ||
            data.message.includes("unauthorized")
          ) {
            handleTokenRefresh();
          }

          setIsConnected(false);
          return;
        }

        if (data.type === "CONNECT") {
          setIsConnected(true);
        } else if (data.type === "NOTIFICATION") {
          addNotification(data);
        } else if (data.type === "DISCONNECT") {
          eventSource.close();
          reconnect();
        }
      } catch (error) {
        console.error("Error parsing notification:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      setIsConnected(false);
      reconnect();
    };

    eventSourceRef.current = eventSource;

    return eventSource;
  }, [addNotification, fetchNotifications]);

  // 재연결 메서드
  const reconnect = useCallback(() => {
    setTimeout(connectSSE, 5000);
  }, [connectSSE]);

  // 컴포넌트 마운트/언마운트와 무관하게 SSE 연결 유지
  useEffect(() => {
    // 초기 연결
    connectSSE();

    // 브라우저 탭 포커스 시 재연결 로직
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isConnected) {
        reconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 컴포넌트 언마운트 시 연결 정리
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [connectSSE, isConnected, reconnect]);

  return { isConnected, reconnect };
};
