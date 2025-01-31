import { Block } from "../../../../features/Write/model/BlockEditor/BlockEditor";

export interface ListItem {
  id: string;
  content: string;
  level: number;
  isCollapsed: boolean;
}
export interface ListOptions {
  maxLevel?: number;
  minItems?: number;
  maxItems?: number;
  allowCollapse?: boolean;
}
export type ListType = "bullet" | "numbered";
export type NumberingStyle = "decimal" | "alpha" | "roman";
export interface ListError extends Error {
  code: "SERIALIZATION_ERROR" | "VALIDATION_ERROR" | "UPDATE_ERROR";
  context: Record<string, unknown>;
}
export interface VirtualItem {
  index: number;
  offsetTop: number;
}
export interface UseListProps {
  block: Block;
  updateBlockContent: (id: string, content: string) => void;
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: Block["type"]) => void) | undefined
  >;
  blockContent: Map<string, string>;
  options?: ListOptions;
  onError?: (error: ListError) => void;
}
export interface ListEditorProps {
  block: Block;
  updateBlockContent: (id: string, content: string) => void;
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: Block["type"]) => void) | undefined
  >;
  blockContent: Map<string, string>;
  options?: ListOptions;
  className?: string;
  onError?: (error: ListError) => void;
}
