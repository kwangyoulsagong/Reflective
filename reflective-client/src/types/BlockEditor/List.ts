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
