// ListItem.tsx
import React, { memo } from "react";
import { ChevronDown } from "lucide-react";
import { ListItem as ListItemType } from "../../../types/BlockEditor/List";

interface ListItemProps {
  item: ListItemType;
  number: string;
  onToggleCollapse?: (id: string) => void;
  onChange: (id: string, content: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: string) => void;
  inputRef?: (element: HTMLInputElement | null) => void;
  allowCollapse?: boolean;
}

export const ListItem = memo<ListItemProps>(
  ({ item, number, onChange, onKeyDown, inputRef }) => {
    // input의 변경 이벤트 핸들러 추가
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(item.id, e.target.value);
    };

    // 키다운 이벤트 핸들러 추가
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown(e, item.id);
    };

    return (
      <div
        className="flex items-start group"
        style={{ marginLeft: `${item.level * 24}px` }}
      >
        <div className="flex items-center mr-2 mt-2 focus:outline-none rounded p-0.5">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex-1">
          <div className="flex items-center">
            <span
              className="mr-2 text-gray-500 min-w-[24px] select-none"
              aria-hidden="true"
            >
              {number}
            </span>
            <input
              ref={inputRef}
              value={item.content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 bg-transparent outline-none border-none  "
              placeholder="리스트 아이템..."
              aria-label={`List item level ${item.level + 1}`}
              autoComplete="off"
              type="text"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    );
  }
);

ListItem.displayName = "ListItem";
