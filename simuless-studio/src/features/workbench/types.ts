import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import type { AppTheme } from "@/app/theme/types"

export type WorkbenchActivityId = "explorer" | "nodes" | "runtime" | "settings"
export type EditorType = "flow" | "code" | "welcome"
export type PanelType = "console" | "problems" | "charts"

export interface ActivityItem {
  id: WorkbenchActivityId
  title: string
  icon: LucideIcon
  badge?: string
  order: number
}

export interface MenuItem {
  id: string
  label: string
  shortcut?: string
  children?: MenuItem[]
  actionId?: string
}

export interface ToolbarAction {
  id: string
  label: string
  icon?: LucideIcon
  enabled?: boolean
  actionId: string
}

export interface EditorTab {
  id: string
  type: EditorType
  title: string
  dirty?: boolean
  closable: boolean
  payload?: Record<string, unknown>
}

export interface EditorViewProps {
  tabId: string
  payload?: Record<string, unknown>
}

export interface EditorFactory {
  type: EditorType
  render: (props: EditorViewProps) => ReactNode
}

export interface PanelTab {
  id: string
  type: PanelType
  title: string
  closable?: boolean
}

export interface PanelView {
  id: string
  title: string
  content: ReactNode
}

export interface PanelAdapter {
  id: PanelType
  canOpen: () => boolean
  open: () => PanelView
  render: () => ReactNode
}

export interface ThemeMenuOption {
  id: AppTheme
  label: string
}
