import { MutableRefObject, useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { PostType } from "@/types/types";
import useInfinitePostsQuery from "./useInfinitePostsQuery";

interface UseVirtualInfiniteScrollProps {
  containerRef: MutableRefObject<HTMLElement | null>;
  itemHeight: number;
  overscan?: number;
}

interface UseVirtualInfiniteScrollReturn {
  virtualItems: {
    index: number;
    offsetTop: number;
    columnIndex: number;
    columnWidth: number;
  }[];
  totalHeight: number;
  columns: number;
  allPosts: PostType[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: unknown;
}

const useVirtualScroll = ({
  containerRef,
  itemHeight,
  overscan = 3,
}: UseVirtualInfiniteScrollProps): UseVirtualInfiniteScrollReturn => {
  const {
    posts: allPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfinitePostsQuery();

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

      // 스크롤이 하단에 가까워지면 다음 페이지 로드
      if (hasNextPage && !isFetchingNextPage) {
        const ScrollBottom =
          scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight;
        if (ScrollBottom < 200) {
          fetchNextPage();
        }
      }
    }, 16),
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const calculateRange = useCallback(() => {
    if (!containerHeight) return { start: 0, end: 10 };

    const rowHeight = itemHeight;
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.ceil((scrollTop + containerHeight) / rowHeight);

    const start = Math.max(0, (startRow - overscan) * columns);
    const end = Math.min(allPosts.length, (endRow + overscan) * columns);

    return { start, end };
  }, [
    scrollTop,
    containerHeight,
    itemHeight,
    allPosts.length,
    overscan,
    columns,
  ]);

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
  }).filter((item) => item.index < allPosts.length);

  const totalRows = Math.ceil(allPosts.length / columns);
  const totalHeight = totalRows * itemHeight;

  return {
    virtualItems,
    totalHeight,
    columns,
    allPosts,
    isLoading,
    isFetchingNextPage,
    error,
  };
};

export default useVirtualScroll;
