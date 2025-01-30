import { useCallback, useState } from "react";
import { ImageValidation } from "../../../services/BlockEditor/Image/validation";
import ImageSizeSlider from "../ImageSize/ImageSize";
import { ImageEditorProps } from "../../../types/BlockEditor/Image";
const imageValidator = new ImageValidation();
const ImageEditor = ({
  block,
  blockContent,
  updateBlockContent,
  debouncedUpdateRef,
  setFocusedBlockId,
  isEditing,
  setIsEditing,
}: ImageEditorProps) => {
  const [imageSize, setImageSize] = useState(100);
  const currentContent = blockContent.get(block.id) || block.content || "";
  const [error, setError] = useState<string | null>(null);
  const handleContentChange = useCallback(
    (newContent: string) => {
      updateBlockContent(block.id, newContent);
      debouncedUpdateRef.current?.(block.id, newContent, block.type);
      if (imageValidator.validate(newContent)) {
        setIsEditing(false);
      }
    },
    [block.id, block.type, updateBlockContent, debouncedUpdateRef]
  );
  return (
    <div className="space-y-2">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={currentContent}
            onChange={(e) => handleContentChange(e.target.value)}
            onFocus={() => setFocusedBlockId(block.id)}
            className={`
              w-full 
              p-2 
              border 
              rounded-md 
              transition-colors 
              duration-200
              ${
                error
                  ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-300 focus:border-blue-400 focus:ring-blue-200"
              }
              focus:outline-none 
              focus:ring-2
            `}
            placeholder="Enter image URL..."
            aria-invalid={!!error}
            aria-describedby="image-error"
          />
          {error && (
            <p
              id="image-error"
              className="text-red-500 text-sm mt-1 animate-pulse"
            >
              {error}
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <img
            src={currentContent}
            alt="Uploaded"
            className="w-full h-auto rounded-md shadow-sm object-cover"
            style={{ maxWidth: `${imageSize}%` }}
            onError={() => {
              // Fallback if image fails to load
              setIsEditing(true);
              setError("Failed to load image");
            }}
          />
          <ImageSizeSlider onChange={(size) => setImageSize(size)} />
        </div>
      )}
    </div>
  );
};
export default ImageEditor;
