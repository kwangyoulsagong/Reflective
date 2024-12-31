export interface ImageEditorProps {
  block: {
    id: string;
    content: string;
    type: string;
  };
  blockContent: Map<string, string>;
  updateBlockContent: (id: string, content: string) => void;
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: string) => void) | undefined
  >;
  setFocusedBlockId: (id: string) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
