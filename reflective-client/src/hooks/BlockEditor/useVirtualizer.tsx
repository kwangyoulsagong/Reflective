import { useMemo, useState } from "react";
import { VirtualItem } from "../../types/BlockEditor/List";

interface UseVirtualizerOptions {
  count: number;
  itemHeight: number;
  overscan?: number;
}

const useVirtualizer = ({
  count,
  itemHeight,
  overscan = 3,
}: UseVirtualizerOptions) => {
  // 현재 스크롤위치 상태
  const [scrollTop, setScrollTop] = useState(0);
  //   화면 높이
  const containerHeight =
    typeof window !== "undefined" ? window.innerHeight : 0;

  const virtualItems = useMemo<VirtualItem[]>(() => {
    // 시작 인덱스 계산 음수가 되지 않도록 Math.max 사용
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );
    // 끝 인덱스 계산 전체 개수를 초과하지 않도록 Math.min 사용
    const endIndex = Math.min(
      count - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
    );
    // 가상 아이템 생성
    return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => ({
      index: startIndex + index,
      offsetTop: (startIndex + index) * itemHeight,
    }));
  }, [count, itemHeight, overscan, scrollTop, containerHeight]);
  return {
    virtualItems,
    totalSize: count * itemHeight,
    setScrollTop,
  };
};
export default useVirtualizer;
