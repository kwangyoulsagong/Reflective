import React, { useCallback } from "react";

import { ListItem } from "./ListItem";
import { VirtualizedList } from "./VirtualizedList";
import { ListEditorProps, ListError } from "../../../types/BlockEditor/List";
import { useLogger } from "../../../hooks/BlockEditor/List/useLogger";
import useListItems from "../../../hooks/BlockEditor/List/useListItems";

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
          첫 아이템을 추가하세요
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <VirtualizedList
        items={listItems}
        virtualItems={virtualItems}
        totalSize={totalSize}
        itemHeight={40}
        onScroll={setScrollTop}
        renderItem={renderListItem}
      />
    </div>
  );
};

ListEditor.displayName = "ListEditor";
