import { create } from "zustand"

import { initialEditorTabs, initialPanelTabs } from "@/features/workbench/config"
import type {
  EditorTab,
  PanelTab,
  WorkbenchActivityId,
} from "@/features/workbench/types"

type WorkbenchState = {
  activeActivity: WorkbenchActivityId
  sidePanelOpen: boolean
  bottomPanelOpen: boolean
  inspectorOpen: boolean
  editorTabs: EditorTab[]
  activeEditorTabId: string
  panelTabs: PanelTab[]
  activePanelTabId: string
  setActiveActivity: (activity: WorkbenchActivityId) => void
  toggleSidePanel: () => void
  toggleBottomPanel: () => void
  toggleInspector: () => void
  setActiveEditorTab: (tabId: string) => void
  openEditorTab: (tab: EditorTab) => void
  closeEditorTab: (tabId: string) => void
  setActivePanelTab: (tabId: string) => void
  openPanelTab: (tabId: string) => void
}

export const useWorkbenchStore = create<WorkbenchState>((set) => ({
  activeActivity: "nodes",
  sidePanelOpen: true,
  bottomPanelOpen: true,
  inspectorOpen: true,
  editorTabs: initialEditorTabs,
  activeEditorTabId: initialEditorTabs[0].id,
  panelTabs: initialPanelTabs,
  activePanelTabId: initialPanelTabs[0].id,
  setActiveActivity: (activity) =>
    set({
      activeActivity: activity,
      sidePanelOpen: true,
    }),
  toggleSidePanel: () =>
    set((state) => ({
      sidePanelOpen: !state.sidePanelOpen,
    })),
  toggleBottomPanel: () =>
    set((state) => ({
      bottomPanelOpen: !state.bottomPanelOpen,
    })),
  toggleInspector: () =>
    set((state) => ({
      inspectorOpen: !state.inspectorOpen,
    })),
  setActiveEditorTab: (tabId) =>
    set({
      activeEditorTabId: tabId,
    }),
  openEditorTab: (tab) =>
    set((state) => {
      const existing = state.editorTabs.find((candidate) => candidate.id === tab.id)

      if (existing) {
        return {
          activeEditorTabId: tab.id,
        }
      }

      return {
        editorTabs: state.editorTabs.concat(tab),
        activeEditorTabId: tab.id,
      }
    }),
  closeEditorTab: (tabId) =>
    set((state) => {
      const nextTabs = state.editorTabs.filter((tab) => tab.id !== tabId)

      if (nextTabs.length === 0) {
        return state
      }

      const nextActiveId =
        state.activeEditorTabId === tabId ? nextTabs[nextTabs.length - 1].id : state.activeEditorTabId

      return {
        editorTabs: nextTabs,
        activeEditorTabId: nextActiveId,
      }
    }),
  setActivePanelTab: (tabId) =>
    set({
      activePanelTabId: tabId,
      bottomPanelOpen: true,
    }),
  openPanelTab: (tabId) =>
    set({
      activePanelTabId: tabId,
      bottomPanelOpen: true,
    }),
}))
