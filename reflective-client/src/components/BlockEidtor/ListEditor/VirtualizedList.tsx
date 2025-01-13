import React, { useRef, useEffect, memo } from "react";
import { ListItem as ListItemType } from "../../../types/BlockEditor/List";

interface VirtualizedListProps {
  items: ListItemType[];
  virtualItems: Array<{ index: number; offsetTop: number }>;
  totalSize: number;
  itemHeight: number;
  renderItem: (index: number) => React.ReactNode;
  onScroll: (scrollTop: number) => void;
}

export const VirtualizedList = memo<VirtualizedListProps>(
  ({ virtualItems, totalSize, itemHeight, renderItem, onScroll }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleScroll = () => {
        onScroll(container.scrollTop);
      };

      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }, [onScroll]);

    return (
      <div
        ref={containerRef}
        className="overflow-auto relative"
        style={{ height: "100%", maxHeight: "600px" }}
        role="list"
      >
        <div
          style={{ height: totalSize, position: "relative" }}
          className="w-full"
        >
          {virtualItems.map((virtualItem) => (
            <div
              key={virtualItem.index}
              style={{
                position: "absolute",
                top: 0,
                transform: `translateY(${virtualItem.offsetTop}px)`,
                width: "100%",
                height: `${itemHeight}px`,
                willChange: "transform",
              }}
              role="listitem"
            >
              {renderItem(virtualItem.index)}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
