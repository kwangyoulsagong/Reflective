import { useState } from "react";
import { Block } from "../../../model/BlockEditor/BlockEditor";
import { DropResult } from "react-beautiful-dnd";

interface UseBlocksProps {
  initialBlocks?: Block[];
}
const useBlocks = ({
  initialBlocks = [{ id: "block-0", content: "", type: "paragraph" }],
}: UseBlocksProps) => {
  // 블록 상태
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  // 선택하거나 편집 중인 블록의 ID를 관리
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  //   블록 추가
  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      content: "",
      type,
    };

    setBlocks((prevBlocks) => {
      const focusedIndex = prevBlocks.findIndex(
        (block) => block.id === focusedBlockId
      );
      if (focusedIndex === -1) {
        return [...prevBlocks, newBlock];
      } else {
        const newBlocks = [...prevBlocks];
        // 시작위치, 삭제할 갯수, 새로운 객체 뒤에 추가
        newBlocks.splice(focusedIndex + 1, 0, newBlock);
        return newBlocks;
      }
    });

    setFocusedBlockId(newBlock.id);
  };

  //   블록 수정
  const updateBlock = (id: string, content: string, type: Block["type"]) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, content, type } : block
      )
    );
  };

  //   블록 제거
  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    // 드롭 대상이 없는 경우 함수 종료
    if (!result.destination) return;
    // 기존 블록 배열을 복사하여 새로운 배열 생성
    const items = Array.from(blocks);
    // 드래그한 블록을 원래 위치에서 제거
    const [reorderedItem] = items.splice(result.source.index, 1);
    // 드래그한 블록을 새 위치에 삽입
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };
  return {
    blocks,
    focusedBlockId,
    setFocusedBlockId,
    addBlock,
    updateBlock,
    removeBlock,
    onDragEnd,
  };
};
export default useBlocks;
