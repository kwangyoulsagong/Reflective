import { useRecoilCallback, useRecoilState } from "recoil";
import { Block } from "../../types/BlockEditor/BlockEditor";
import { blockContentState } from "../../recoil/atoms/blockContentState";
import { useEffect, useRef } from "react";
import { debounce } from "lodash";
import { EDITOR_CONFIG } from "../../constants/blockEditor";
type blockContentState = {
  block: Block;
  updateBlock: (id: string, content: string, type: Block["type"]) => void;
};
const useBlockContent = ({ block, updateBlock }: blockContentState) => {
  // 컨텐츠 관리 리코일로 관리를 한다
  const [blockContent, setBlockContent] = useRecoilState(blockContentState);
  // 디바운스 함수를 useRef로 관리하여 메모리 누수 방지
  const debouncedUpdateRef = useRef<ReturnType<typeof debounce>>();
  // 컴포넌트 마운트 시 디바운스 함수 생성
  useEffect(() => {
    debouncedUpdateRef.current = debounce(
      (id: string, content: string, type: Block["type"]) => {
        updateBlock(id, content, type);
      },
      EDITOR_CONFIG.DEBOUNCE_DELAY
    );
    // 클린업 함수에서 디바운스 함수 취소
    return () => {
      debouncedUpdateRef.current?.cancel();
    };
  }, [updateBlock]);

  const updateBlockContent = useRecoilCallback(
    ({ set }) =>
      (id: string, content: string) => {
        set(blockContentState, (prev) => new Map(prev).set(id, content));
      },
    []
  );
  return {
    block,
    blockContent,
    setBlockContent,
    updateBlockContent,
    debouncedUpdateRef,
  };
};
export default useBlockContent;
