import { debounce } from "lodash";
import { Block, ListItem } from "../../types/BlockEditor/BlockEditor";
import { useCallback, useRef, useState } from "react";

const useListItems = (
  block: Block,
  updateBlockContent: (id: string, content: string) => void,
  debouncedUpdateRef: React.MutableRefObject<
    ReturnType<typeof debounce> | undefined
  >
) => {
  // 리스트 기능 상태
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const itemRefs = useRef<{ [key: string]: HTMLInputElement }>({});
  // 리스트 데이터 직렬화
  const seriallizeListItems = useCallback((items: ListItem[]): string => {
    return JSON.stringify(items);
  }, []);

  // 리스트 데이터 비직렬화
  const deserializeListItems = useCallback((content: string): ListItem[] => {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }, []);

  //리스트 생서이 id 생성
  const generateId = useCallback(() => {
    return `item-${Math.random().toString(36).substr(2, 9)}`;
  }, []);
};
export default useListItems;
