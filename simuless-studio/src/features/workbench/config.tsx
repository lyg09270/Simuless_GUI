import {
  Boxes,
  Files,
  Gauge,
  Play,
  Save,
  Settings2,
  Square,
  TerminalSquare,
} from "lucide-react"

import type {
  ActivityItem,
  EditorTab,
  MenuItem,
  PanelTab,
  ToolbarAction,
} from "@/features/workbench/types"

export const activityItems: ActivityItem[] = [
  { id: "explorer", title: "Explorer", icon: Files, order: 1 },
  { id: "nodes", title: "Nodes", icon: Boxes, order: 2 },
  { id: "runtime", title: "Runtime", icon: Gauge, order: 3 },
  { id: "settings", title: "Settings", icon: Settings2, order: 4 },
]

export const topMenuItems: MenuItem[] = [
  {
    id: "file",
    label: "File",
    children: [
      { id: "file.new", label: "New Flow", shortcut: "Ctrl+N", actionId: "file.new" },
      { id: "file.open", label: "Open Placeholder", shortcut: "Ctrl+O", actionId: "file.open" },
      { id: "file.save", label: "Save", shortcut: "Ctrl+S", actionId: "file.save" },
    ],
  },
  {
    id: "view",
    label: "View",
    children: [
      {
        id: "view.toggleSidePanel",
        label: "Toggle Side Panel",
        shortcut: "Ctrl+B",
        actionId: "view.toggleSidePanel",
      },
      {
        id: "view.toggleBottomPanel",
        label: "Toggle Bottom Panel",
        shortcut: "Ctrl+J",
        actionId: "view.toggleBottomPanel",
      },
    ],
  },
  {
    id: "run",
    label: "Run",
    children: [
      { id: "run.start", label: "Start Runtime", actionId: "run.start" },
      { id: "run.stop", label: "Stop Runtime", actionId: "run.stop" },
    ],
  },
]

export const toolbarActions: ToolbarAction[] = [
  { id: "file.save", label: "Save", icon: Save, actionId: "file.save" },
  { id: "run.start", label: "Run", icon: Play, actionId: "run.start" },
  { id: "run.stop", label: "Stop", icon: Square, actionId: "run.stop" },
  {
    id: "workbench.focusConsole",
    label: "Console",
    icon: TerminalSquare,
    actionId: "workbench.focusConsole",
  },
]

export const initialEditorTabs: EditorTab[] = [
  {
    id: "editor-flow-main",
    type: "flow",
    title: "main.flow",
    closable: false,
  },
  {
    id: "editor-code-placeholder",
    type: "code",
    title: "control.ts",
    closable: true,
  },
  {
    id: "editor-welcome",
    type: "welcome",
    title: "Welcome",
    closable: true,
  },
]

export const initialPanelTabs: PanelTab[] = [
  { id: "panel-console", type: "console", title: "Console" },
  { id: "panel-problems", type: "problems", title: "Problems" },
  { id: "panel-charts", type: "charts", title: "Charts" },
]
