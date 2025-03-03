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

    // 초기 알림 불러오기
    fetchNotifications();

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
      console.log("SSE connection established");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received SSE message:", data);

        // 에러 타입 처리
        if (data.type === "ERROR") {
          console.error("SSE 연결 에러:", data.message);
          setIsConnected(false);
          return;
        }

        if (data.type === "CONNECT") {
          console.log("SSE 연결 성공:", data.message);
          setIsConnected(true);
        } else if (data.type === "NOTIFICATION") {
          // 중요: 항상 알림 추가 및 최신 알림 패치
          addNotification(data);
          fetchNotifications();
        } else if (data.type === "DISCONNECT") {
          console.log("서버에서 연결 종료 신호");
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
    // 5초 후 재연결 시도
    setTimeout(connectSSE, 5000);
  }, [connectSSE]);

  // 컴포넌트 마운트/언마운트와 무관하게 SSE 연결 유지
  useEffect(() => {
    // 브라우저 탭 포커스 시 재연결 로직
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (!isConnected) {
          reconnect();
        }
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
