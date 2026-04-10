import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  StudioState,
  StudioMode,
  Language,
  Theme,
  StudioNode,
  StudioEdge,
  EditorTab,
  FileItem,
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

  // Tab management actions
  openTab: (tab: EditorTab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabContent: (tabId: string, content: string) => void;
  closeAllTabs: () => void;

  // File browser actions
  setWorkingDirectory: (path: string) => void;
  setFileTree: (files: FileItem[]) => void;
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
        tabs: [],
        activeTabId: null,
        workingDirectory: "/workspace",
        fileTree: [],

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

        // Tab management actions
        openTab: (tab) =>
          set((state) => {
            const existingTab = state.tabs.find((t) => t.id === tab.id);
            if (existingTab) {
              return { activeTabId: tab.id };
            }
            return {
              tabs: [...state.tabs, tab],
              activeTabId: tab.id,
            };
          }),
        closeTab: (tabId) =>
          set((state) => {
            const newTabs = state.tabs.filter((t) => t.id !== tabId);
            let newActiveTab = state.activeTabId;
            if (state.activeTabId === tabId) {
              newActiveTab = newTabs.length > 0 ? newTabs[0].id : null;
            }
            return {
              tabs: newTabs,
              activeTabId: newActiveTab,
            };
          }),
        setActiveTab: (tabId) => set({ activeTabId: tabId }),
        updateTabContent: (tabId, content) =>
          set((state) => ({
            tabs: state.tabs.map((t) =>
              t.id === tabId ? { ...t, content, isDirty: true } : t
            ),
          })),
        closeAllTabs: () => set({ tabs: [], activeTabId: null }),

        // File browser actions
        setWorkingDirectory: (path) => set({ workingDirectory: path }),
        setFileTree: (files) => set({ fileTree: files }),
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
