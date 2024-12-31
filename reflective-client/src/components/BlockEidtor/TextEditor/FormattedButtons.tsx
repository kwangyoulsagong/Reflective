// src/components/BlockEditor/TextEditor/FormatButtons.tsx
import React from "react";
import { Bold, Italic, Underline, Eye, EyeOff } from "lucide-react";
import { FormatButtonsProps } from "../../../types/BlockEditor/Text";

export const FormatButtons = React.memo<FormatButtonsProps>(
  ({ onFormat, isEditing, onToggleEdit }) => {
    return (
      <div className="flex space-x-2 mb-2">
        <button
          type="button"
          onClick={() => onFormat("bold")}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => onFormat("italic")}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => onFormat("underline")}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label="Underline"
        >
          <Underline size={16} />
        </button>
        <button
          type="button"
          onClick={onToggleEdit}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label={isEditing ? "Preview" : "Edit"}
        >
          {isEditing ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    );
  }
);
