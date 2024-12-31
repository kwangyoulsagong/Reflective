import React from "react";
import { Block } from "./BlockEditor";

export interface ChartEditorProps {
  block: Block;
  updateBlock: (id: string, content: string, type: Block["type"]) => void;
  blockContent: Map<string, string>;
  updateBlockContent: (id: string, content: string) => void;
  debouncedUpdateRef: React.MutableRefObject<
    ((id: string, content: string, type: string) => void) | undefined
  >;
  setFocusedBlockId: (id: string) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
  }[];
}
