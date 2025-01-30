import { MutableRefObject, useCallback, useEffect, useState } from "react";
import _ from "lodash";

interface VirtualScrollProps {
  containerRef: MutableRefObject<HTMLElement | null>;
  itemHeight: number;
  totalItems: number;
  overscan?: number;
}

interface VirtualScrollReturn {
  virtualItems: {
    index: number;
    offsetTop: number;
    columnIndex: number;
    columnWidth: number;
  }[];
  totalHeight: number;
  columns: number;
}

const useVirtualScroll = ({
  containerRef,
  itemHeight,
  totalItems,
  overscan = 3,
}: VirtualScrollProps): VirtualScrollReturn => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [columns, setColumns] = useState(getColumnCount());

  function getColumnCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  const onScroll = useCallback(
    _.throttle((e: Event) => {
      const scroll = e.target as HTMLElement;
      setScrollTop(Math.max(0, scroll.scrollTop));
    }, 16),
    []
  );

  const calculateRange = useCallback(() => {
    if (!containerHeight) return { start: 0, end: 10 };

    const rowHeight = itemHeight;
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.ceil((scrollTop + containerHeight) / rowHeight);

    const start = Math.max(0, (startRow - overscan) * columns);
    const end = Math.min(totalItems, (endRow + overscan) * columns);

    return { start, end };
  }, [scrollTop, containerHeight, itemHeight, totalItems, overscan, columns]);

  useEffect(() => {
    const handleResize = _.debounce(() => {
      setColumns(getColumnCount());
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(
      _.debounce((entries) => {
        const height = entries[0]?.contentRect.height;
        if (height) {
          setContainerHeight(height);
          onScroll({ target: containerRef.current } as unknown as Event);
        }
      }, 100)
    );

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [containerRef, onScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [containerRef, onScroll]);

  const { start, end } = calculateRange();
  const columnWidth = 100 / columns;

  const virtualItems = Array.from({ length: end - start }, (_, index) => {
    const absoluteIndex = start + index;
    const columnIndex = absoluteIndex % columns;
    const row = Math.floor(absoluteIndex / columns);
    return {
      index: absoluteIndex,
      offsetTop: row * itemHeight,
      columnIndex,
      columnWidth,
    };
  });

  const totalRows = Math.ceil(totalItems / columns);
  const totalHeight = totalRows * itemHeight;

  return {
    virtualItems,
    totalHeight,
    columns,
  };
};

export default useVirtualScroll;
