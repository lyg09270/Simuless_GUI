import type { Node, Edge } from "reactflow";

export interface NodeData {
  label: string;
  [key: string]: any;
}

export interface StudioNode extends Node<NodeData> {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface StudioEdge extends Edge {
  id: string;
  source: string;
  target: string;
}

export type StudioMode = "graph" | "code";
export type Language = "en" | "zh";
export type Theme = "light" | "dark";

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileItem[];
}

export interface EditorTab {
  id: string;
  filePath: string;
  fileName: string;
  content: string;
  isDirty: boolean;
  language?: "python" | "typescript" | "javascript" | "json";
}

export interface StudioState {
  // Mode & Display
  mode: StudioMode;
  language: Language;
  theme: Theme;

  // Canvas
  nodes: StudioNode[];
  edges: StudioEdge[];
  selectedNodeId: string | null;

  // UI State
  sidebarOpen: boolean;
  propertyPanelOpen: boolean;

  // Code Editor
  tabs: EditorTab[];
  activeTabId: string | null;
  workingDirectory: string;
  fileTree: FileItem[];
}
