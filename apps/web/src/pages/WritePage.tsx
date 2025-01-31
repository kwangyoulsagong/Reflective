import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import WriteUpload from "../features/Write/ui/upload/WriteUpload";
import { SavePostType } from "../entities/BlockEditor/model/type/BlockEditor";
import useBlocks from "../features/Write/libs/hooks/Blocks/useBlocks";
import { Button } from "@repo/ui/button";
import BlockMenu from "../features/Write/ui/BlockEditor/BlockMenu";
import BlockEditor from "../features/Write/ui/BlockEditor/BlockEditor";

const Write: React.FC = () => {
  const { state } = useLocation();
  const isEdit = Boolean(state?.post);

  const [title, setTitle] = useState(isEdit ? state.post.title : "");
  const {
    blocks,
    focusedBlockId,
    setFocusedBlockId,
    addBlock,
    updateBlock,
    removeBlock,
    onDragEnd,
  } = useBlocks({
    initialBlocks: isEdit ? state.post.contents : undefined,
  });
  const [data, setData] = useState<SavePostType>({
    title: "",
    contents: [],
    category: isEdit ? state.post.category : "",
    thumbnail: isEdit ? state.post.thumbnail : "",
    like_count: isEdit ? state.post.like_count : 0,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

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
          <Button variant="secondary" onClick={handleSubmit}>
            제출하기
          </Button>
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

export default Write;
