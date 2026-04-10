import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  StudioState,
  StudioMode,
  Language,
  Theme,
  StudioNode,
  StudioEdge,
} from "@/types/graph";

interface StudioStore extends StudioState {
  // Mode & Display actions
  setMode: (mode: StudioMode) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Canvas actions
  setNodes: (nodes: StudioNode[]) => void;
  setEdges: (edges: StudioEdge[]) => void;
  addNode: (node: StudioNode) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, data: Partial<StudioNode>) => void;
  addEdge: (edge: StudioEdge) => void;
  deleteEdge: (edgeId: string) => void;

  // Selection actions
  selectNode: (nodeId: string | null) => void;
  toggleSidebar: () => void;
  togglePropertyPanel: () => void;
}

export const useStudioStore = create<StudioStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        mode: "graph",
        language: "en",
        theme: "light",
        nodes: [],
        edges: [],
        selectedNodeId: null,
        sidebarOpen: true,
        propertyPanelOpen: false,

        // Mode & Display actions
        setMode: (mode) => set({ mode }),
        setLanguage: (language) => set({ language }),
        setTheme: (theme) => set({ theme }),
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),

        // Canvas actions
        setNodes: (nodes) => set({ nodes }),
        setEdges: (edges) => set({ edges }),
        addNode: (node) =>
          set((state) => ({
            nodes: [...state.nodes, node],
          })),
        deleteNode: (nodeId) =>
          set((state) => ({
            nodes: state.nodes.filter((n) => n.id !== nodeId),
            edges: state.edges.filter(
              (e) => e.source !== nodeId && e.target !== nodeId
            ),
            selectedNodeId:
              state.selectedNodeId === nodeId ? null : state.selectedNodeId,
          })),
        updateNode: (nodeId, data) =>
          set((state) => ({
            nodes: state.nodes.map((n) =>
              n.id === nodeId ? { ...n, ...data } : n
            ),
          })),
        addEdge: (edge) =>
          set((state) => ({
            edges: [...state.edges, edge],
          })),
        deleteEdge: (edgeId) =>
          set((state) => ({
            edges: state.edges.filter((e) => e.id !== edgeId),
          })),

        // Selection actions
        selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
        toggleSidebar: () =>
          set((state) => ({
            sidebarOpen: !state.sidebarOpen,
          })),
        togglePropertyPanel: () =>
          set((state) => ({
            propertyPanelOpen: !state.propertyPanelOpen,
          })),
      }),
      {
        name: "studio-store",
      }
    ),
    {
      name: "StudioStore",
    }
  )
);
