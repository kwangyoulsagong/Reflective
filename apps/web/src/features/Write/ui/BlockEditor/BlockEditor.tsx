import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ImageEditor from "./ImageEditor/ImageEditor";
import ListEditor from "./ListEditor/ListEditor";
import TextEditor from "./TextEditor/TextEditor";
import CodeEditor from "./CodeEditor/CodeEditor";
import ChartEditor from "./ChartEditor/ChartEditor";
import useBlockContent from "../../libs/hooks/BlockEditor/useBlockContent";
import { BlockEditorProps } from "../../model/BlockEditor/BlockEditor";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BlockEditor: React.FC<BlockEditorProps> = React.memo(
  ({ block, updateBlock, removeBlock, setFocusedBlockId }) => {
    const [isEditing, setIsEditing] = useState(true);
    const { blockContent, updateBlockContent, debouncedUpdateRef } =
      useBlockContent({ block, updateBlock });
    const renderEditor = () => {
      switch (block.type) {
        case "paragraph":
        case "heading1":
        case "heading2":
        case "heading3":
          return (
            <TextEditor
              block={block}
              blockContent={blockContent}
              updateBlockContent={updateBlockContent}
              debouncedUpdateRef={debouncedUpdateRef}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onFocus={() => setFocusedBlockId(block.id)}
            />
          );

        case "list":
        case "numbered-list":
          return (
            <ListEditor
              block={block}
              updateBlockContent={updateBlockContent}
              debouncedUpdateRef={debouncedUpdateRef}
              blockContent={blockContent}
              options={{
                maxLevel: 5,
                minItems: 1,
                maxItems: 1000,
                allowCollapse: true,
              }}
              className="w-full"
              onError={(error) => {
                console.error("List operation failed:", error);
              }}
            />
          );

        case "image":
          return (
            <ImageEditor
              block={block}
              blockContent={blockContent}
              updateBlockContent={updateBlockContent}
              debouncedUpdateRef={debouncedUpdateRef}
              setFocusedBlockId={setFocusedBlockId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          );

        case "code":
          return (
            <CodeEditor
              block={block}
              blockContent={blockContent}
              updateBlockContent={updateBlockContent}
              debouncedUpdateRef={debouncedUpdateRef}
              setFocusedBlockId={setFocusedBlockId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          );
        case "chart":
          return (
            <ChartEditor
              block={block}
              updateBlock={updateBlock}
              blockContent={blockContent}
              updateBlockContent={updateBlockContent}
              debouncedUpdateRef={debouncedUpdateRef}
              setFocusedBlockId={setFocusedBlockId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          );
        default:
          return null;
      }
    };
    return (
      <div className="mb-4 p-2 border rounded-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{block.type}</span>
          <button
            onClick={() => removeBlock(block.id)}
            className="text-red-500"
          >
            <Trash2 />
          </button>
        </div>
        {renderEditor()}
      </div>
    );
  }
);

export default BlockEditor;
