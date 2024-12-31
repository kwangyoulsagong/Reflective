import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ListError,
  ListItem,
  UseListProps,
} from "../../../types/BlockEditor/List";
import { useLogger } from "./useLogger";
import { DEFAULT_OPTIONS } from "../../../constants/blockEditor";
import { FocusManager } from "../../../services/BlockEditor/list/focus";
import { ListValidator } from "../../../services/BlockEditor/list/validation";
import { ListNumberingStrategy } from "../../../services/BlockEditor/list/numbering";
import useVirtualizer from "./useVirtualizer";

const useListItems = ({
  block,
  updateBlockContent,
  debouncedUpdateRef,
  blockContent,
  options = {},
  onError,
}: UseListProps) => {
  const logger = useLogger("useList");
  // 리스트 기능 상태
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const itemRefs = useRef<{ [key: string]: HTMLInputElement }>({});
  const previousItems = useRef<ListItem[]>([]);
  const mergedOptions = useMemo(
    () => ({ ...DEFAULT_OPTIONS, ...options }),
    [options]
  );

  // focus item
  const focusManager = useMemo(() => new FocusManager(itemRefs), []);

  // 리스트 유효서 검사
  const validator = useMemo(
    () => new ListValidator(mergedOptions),
    [mergedOptions]
  );

  // 리스트 여부 불릿인지 넘버인지
  const numberingStrategy = useMemo(
    () =>
      new ListNumberingStrategy(
        block.type === "numbered-list" ? "numbered" : "bullet"
      ),
    [block.type]
  );

  // 가상 렌더링
  const { virtualItems, totalSize, setScrollTop } = useVirtualizer({
    count: listItems.length,
    itemHeight: 40,
    overscan: 5,
  });

  const handleError = useCallback(
    (error: ListError) => {
      logger.error(error.message, error.context);
      onError?.(error);

      if (error.code === "UPDATE_ERROR") {
        setListItems(previousItems.current);
      }
    },
    [logger, onError]
  );
  //리스트 생서이 id 생성
  const generateId = useCallback(() => {
    return crypto.randomUUID();
  }, []);
  // 리스트 데이터 직렬화
  const serializeItems = useCallback(
    (items: ListItem[]): string => {
      try {
        return JSON.stringify(items);
      } catch (error) {
        handleError({
          name: "ListError",
          code: "SERIALIZATION_ERROR",
          message: "Failed to serialize list items",
          context: { items },
        } as ListError);
        return "[]";
      }
    },
    [handleError]
  );

  // 리스트 데이터 비직렬화
  const deserializeItems = useCallback(
    (content: string): ListItem[] => {
      try {
        const items = JSON.parse(content);
        validator.validateItems(items);
        return items;
      } catch (error) {
        handleError(error as ListError);
        return [];
      }
    },
    [validator, handleError]
  );

  // 기본 리스트 아이템
  const createDefaultItem = useCallback(
    (): ListItem => ({
      id: generateId(),
      content: "",
      level: 0,
      isCollapsed: false,
    }),
    [generateId]
  );

  // 리스트 아이템 업데이트
  const updateItems = useCallback(
    (newItems: ListItem[]) => {
      try {
        validator.validateItems(newItems);
        setListItems(newItems);
        const serialized = serializeItems(newItems);
        updateBlockContent(block.id, serialized);
        debouncedUpdateRef.current?.(block.id, serialized, block.type);
      } catch (error) {
        handleError(error as ListError);
      }
    },
    [
      block.id,
      block.type,
      listItems,
      validator,
      serializeItems,
      updateBlockContent,
    ]
  );

  // 리스트 추가
  const addListItem = useCallback(
    (afterId: string, level: number) => {
      try {
        const newItem: ListItem = {
          id: generateId(),
          content: "",
          level,
          isCollapsed: false,
        };
        validator.validateItem(newItem);
        const newItems = [...listItems];
        const index = listItems.findIndex((item) => item.id === afterId);

        // 첫 아이템이거나 찾은 경우
        if (index === -1 && listItems.length === 0) {
          newItems.push(newItem);
        } else if (index !== -1) {
          newItems.splice(index + 1, 0, newItem);
        } else {
          return;
        }

        updateItems(newItems);
        focusManager.focus(newItem.id);
      } catch (error) {
        handleError(error as ListError);
      }
    },
    [generateId, listItems, validator, updateItems, focusManager, handleError]
  );
  // 리스트 제거
  const removeListItem = useCallback(
    (id: string) => {
      try {
        if (listItems.length <= mergedOptions.minItems) return;

        const index = listItems.findIndex((item) => item.id === id);
        if (index === -1) return;

        const newItems = listItems.filter((item) => item.id !== id);

        if (newItems.length === 0) {
          newItems.push(createDefaultItem());
        }

        updateItems(newItems);

        if (index > 0) {
          focusManager.focus(listItems[index - 1].id);
        }
      } catch (error) {
        handleError(error as ListError);
      }
    },
    [
      listItems,
      mergedOptions.minItems,
      createDefaultItem,
      updateItems,
      focusManager,
      handleError,
    ]
  );

  const handleListItemChange = useCallback(
    (id: string, content: string) => {
      try {
        const newItems = listItems.map((item) =>
          item.id === id ? { ...item, content } : item
        );
        updateItems(newItems);
      } catch (error) {
        handleError(error as ListError);
      }
    },
    [listItems, updateItems, handleError]
  );

  // 들여쓰기 증가
  const increaseIndent = useCallback(
    (id: string) => {
      try {
        const index = listItems.findIndex((item) => item.id === id);
        if (index === 0) return;
        const currentItem = listItems[index];
        const prevItem = listItems[index - 1];
        const newLevel = currentItem.level + 1;
        if (
          newLevel > mergedOptions.maxLevel ||
          newLevel > prevItem.level + 1
        ) {
          return;
        }

        const newItems = listItems.map((item) =>
          item.id === id ? { ...item, level: newLevel } : item
        );
        updateItems(newItems);
      } catch (error) {
        handleError(error as ListError);
      }
    },
    [listItems, mergedOptions.maxLevel, updateItems, handleError]
  );
  // 들여쓰기 감소
  const decreaseIndent = useCallback(
    (id: string) => {
      try {
        const index = listItems.findIndex((item) => item.id === id);
        if (index === -1) return;

        const currentItem = listItems[index];
        if (currentItem.level === 0) return;

        const newItems = listItems.map((item) =>
          item.id === id ? { ...item, level: item.level - 1 } : item
        );

        updateItems(newItems);
      } catch (error) {
        handleError(error as ListError);
      }
    },
    [listItems, updateItems, handleError]
  );

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
      const currentItem = listItems.find((item) => item.id === id);
      if (!currentItem) return;

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (currentItem.content.trim() === "") {
          if (currentItem.level > 0) {
            decreaseIndent(id);
          } else if (listItems.length > mergedOptions.minItems) {
            removeListItem(id);
          }
        } else {
          addListItem(id, currentItem.level);
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          decreaseIndent(id);
        } else {
          increaseIndent(id);
        }
      } else if (e.key === "Backspace" && currentItem.content === "") {
        e.preventDefault();
        if (listItems.length > mergedOptions.minItems) {
          removeListItem(id);
        }
      }
    },
    [
      listItems,
      mergedOptions.minItems,
      addListItem,
      removeListItem,
      increaseIndent,
      decreaseIndent,
    ]
  );
  // 초기 데이터 로드
  useEffect(() => {
    try {
      const content = blockContent.get(block.id) || "[]"; // 기본값을 빈 배열 문자열로
      let initialItems: ListItem[] = [];
      try {
        initialItems = deserializeItems(content);
      } catch {
        initialItems = [];
      }

      if (initialItems.length < mergedOptions.minItems) {
        initialItems = [createDefaultItem()];
      }

      setListItems(initialItems);
    } catch (error) {
      console.error("Failed to initialize list items:", error);
      setListItems([createDefaultItem()]);
    }
  }, [block.id]); // 의존성을 block.id만으로 최소화

  return {
    listItems,
    virtualItems,
    totalSize,
    itemRefs,
    addListItem,
    removeListItem,
    handleListItemChange,
    handleListKeyDown,
    increaseIndent,
    decreaseIndent,
    calculateNumber: numberingStrategy.getMarker.bind(numberingStrategy),
    setScrollTop,
  };
};
export default useListItems;
