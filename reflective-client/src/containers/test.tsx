import React, { useState } from "react";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import WriteUpload from "../components/WriteUpload";
import { Block, SavePostType } from "../types/types";
import BlockEditor from "../components/refactoringBlockEidtor/BlockRefectorEditor";
import BlockMenu from "../components/BlockMenu";

const Test: React.FC = () => {
  const { state } = useLocation();
  const isEdit = Boolean(state?.post);

  const [title, setTitle] = useState(isEdit ? state.post.title : "");
  const [blocks, setBlocks] = useState<Block[]>(
    isEdit
      ? state.post.contents
      : [{ id: "block-0", content: "", type: "paragraph" }]
  );
  const [data, setData] = useState<SavePostType>({
    title: "",
    contents: [],
    category: isEdit ? state.post.category : "",
    thumbnail: isEdit ? state.post.thumbnail : "",
    like_count: isEdit ? state.post.like_count : 0,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

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
        newBlocks.splice(focusedIndex + 1, 0, newBlock);
        return newBlocks;
      }
    });

    setFocusedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, content: string, type: Block["type"]) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, content, type } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  const handleSubmit = () => {
    setData((prev) => ({
      ...prev,
      title,
      contents: blocks,
    }));
    setOpenModal(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <section className="flex flex-col w-full max-w-4xl">
        <input
          value={title}
          placeholder="제목을 입력해주세요..."
          className="text-4xl font-bold mb-4 p-2 outline-none border-b"
          onChange={(e) => setTitle(e.target.value)}
        />
        <BlockMenu onAddBlock={addBlock} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {blocks.map((block, index) => (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BlockEditor
                          block={block}
                          updateBlock={updateBlock}
                          removeBlock={removeBlock}
                          setFocusedBlockId={setFocusedBlockId}
                          isFocused={block.id === focusedBlockId}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold"
          >
            Submit
          </button>
        </div>
      </section>
      {openModal && (
        <WriteUpload
          data={data}
          onClose={() => setOpenModal(false)}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default Test;
