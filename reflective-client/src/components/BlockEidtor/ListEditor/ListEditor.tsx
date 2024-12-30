import React, { useCallback } from "react";

import { ListItem } from "./ListItem";
import { VirtualizedList } from "./VirtualizedList";
import { Block } from "../../../types/BlockEditor/BlockEditor";
import { ListError, ListOptions } from "../../../types/BlockEditor/List";
import { useLogger } from "../../../hooks/BlockEditor/useLogger";
import useListItems from "../../../hooks/BlockEditor/useListItems";

interface ListEditorProps {
  block: Block;
  updateBlockContent: (id: string, content: string) => void;
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: Block["type"]) => void) | undefined
  >;
  blockContent: Map<string, string>;
  options?: ListOptions;
  className?: string;
  onError?: (error: ListError) => void;
}

export const ListEditor: React.FC<ListEditorProps> = ({
  block,
  updateBlockContent,
  debouncedUpdateRef,
  blockContent,
  options,
  className = "",
  onError,
}) => {
  const logger = useLogger("ListEditor");

  const handleError = useCallback(
    (error: ListError) => {
      logger.error("List operation failed", { error });
      onError?.(error);
    },
    [logger, onError]
  );

  const {
    listItems,
    virtualItems,
    totalSize,
    itemRefs,
    isUpdating,
    addListItem,
    handleListItemChange,
    handleListKeyDown,
    calculateNumber,
    setScrollTop,
  } = useListItems({
    block,
    updateBlockContent,
    debouncedUpdateRef,
    blockContent,
    options,
    onError: handleError,
  });

  const renderListItem = useCallback(
    (index: number) => (
      <ListItem
        key={listItems[index].id}
        item={listItems[index]}
        number={calculateNumber(listItems, index)}
        onChange={handleListItemChange}
        onKeyDown={handleListKeyDown}
        inputRef={(el) => {
          if (el) itemRefs.current[listItems[index].id] = el;
        }}
        allowCollapse={options?.allowCollapse}
      />
    ),
    [
      listItems,
      calculateNumber,
      handleListItemChange,
      handleListKeyDown,
      itemRefs,
      options?.allowCollapse,
    ]
  );

  if (listItems.length === 0) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => addListItem(crypto.randomUUID(), 0)}
          className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md border border-gray-300"
        >
          Add first item...
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      aria-busy={isUpdating}
      aria-live="polite"
    >
      <VirtualizedList
        items={listItems}
        virtualItems={virtualItems}
        totalSize={totalSize}
        itemHeight={40}
        onScroll={setScrollTop}
        renderItem={renderListItem}
      />
      {isUpdating && (
        <div
          className="absolute top-0 right-0 mt-2 mr-2 text-sm text-gray-500"
          aria-hidden="true"
        >
          Updating...
        </div>
      )}
    </div>
  );
};

ListEditor.displayName = "ListEditor";
