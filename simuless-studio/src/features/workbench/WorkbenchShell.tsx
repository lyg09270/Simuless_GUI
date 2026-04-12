import type { ReactNode } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FolderTree,
  LayoutPanelLeft,
  Search,
  Settings2,
  TriangleAlert,
  Workflow,
} from "lucide-react"

import { ThemeSettingsPanel } from "@/app/theme/ThemeSettingsPanel"
import { ThemeToggleAction } from "@/app/theme/ThemeToggleAction"
import { Button } from "@/components/ui/button"
import WindowTitleBar from "@/components/window/WindowTitleBar"
import FlowCanvas from "@/features/flow/FlowCanvas"
import ConsolePanel from "@/features/panels/ConsolePanel"
import NodeLibraryPanel from "@/features/panels/NodeLibraryPanel"
import PropertyPanel from "@/features/panels/PropertyPanel"
import { activityItems, topMenuItems, toolbarActions } from "@/features/workbench/config"
import { useWorkbenchStore } from "@/features/workbench/store"
import type {
  ActivityItem,
  EditorFactory,
  EditorTab,
  PanelAdapter,
  PanelTab,
  WorkbenchActivityId,
} from "@/features/workbench/types"

function ExplorerPanel() {
  const files = [
    "flows/main.flow",
    "flows/vehicle.flow",
    "runtime/session.json",
    "notes/readme.md",
  ]

  return (
    <div className="space-y-4 p-3">
      <div className="rounded-lg border border-border bg-background/70 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <FolderTree className="size-3.5" />
          Workspace
        </div>

        <div className="space-y-2 text-sm">
          {files.map((file) => (
            <div key={file} className="rounded-md px-2 py-1 hover:bg-accent">
              {file}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background/70 p-3 text-sm text-muted-foreground">
        This panel is registered independently from the editor area, so future project trees and assets can plug in without changing the shell.
      </div>
    </div>
  )
}

function RuntimePanel() {
  const metrics = [
    ["Bridge", "Disconnected"],
    ["Simulation", "Idle"],
    ["Terminal", "Adapter pending"],
  ]

  return (
    <div className="space-y-4 p-3">
      <div className="grid gap-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-background/70 p-3">
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
            <div className="mt-1 font-medium">{value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm">Start Runtime</Button>
        <Button size="sm" variant="outline">
          Stop
        </Button>
      </div>
    </div>
  )
}

function WelcomeEditor() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="max-w-xl rounded-2xl border border-border bg-card/90 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Welcome
        </div>
        <h2 className="mt-2 text-2xl font-semibold">Simuless Studio Workbench</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The shell is organized like a desktop IDE: activity bar, side panel, tabbed editors, inspector, bottom panel, and centralized theme control.
        </p>
      </div>
    </div>
  )
}

function CodeEditorPlaceholder() {
  return (
    <div className="flex h-full flex-col bg-[var(--workbench-editor)]">
      <div className="border-b border-border px-4 py-2 text-xs text-muted-foreground">
        Code editor placeholder
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <pre className="rounded-xl border border-border bg-card/70 p-4 leading-6 text-foreground/90">
{`export function controller(input: number) {
  const gain = 1.25
  return input * gain
}

// Monaco or another editor can replace this view later
// without changing the editor host contract.`}
        </pre>
      </div>
    </div>
  )
}

function ProblemsPanel() {
  return (
    <div className="space-y-3 p-3 text-sm">
      <div className="rounded-lg border border-border bg-background/70 p-3">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <TriangleAlert className="size-4 text-amber-500" />
          Problems adapter placeholder
        </div>
        <div className="text-muted-foreground">
          Validation diagnostics, graph compile errors, and IPC health warnings can register here later.
        </div>
      </div>
    </div>
  )
}

function ChartsPanel() {
  return (
    <div className="space-y-3 p-3 text-sm">
      <div className="rounded-lg border border-border bg-background/70 p-3">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <Workflow className="size-4" />
          Charts adapter placeholder
        </div>
        <div className="text-muted-foreground">
          Plotly or another chart view can plug into the same bottom panel host when telemetry is available.
        </div>
      </div>
    </div>
  )
}

const sidePanelViews: Record<WorkbenchActivityId, { title: string; render: () => ReactNode }> = {
  explorer: {
    title: "Explorer",
    render: () => <ExplorerPanel />,
  },
  nodes: {
    title: "Nodes",
    render: () => <NodeLibraryPanel />,
  },
  runtime: {
    title: "Runtime",
    render: () => <RuntimePanel />,
  },
  settings: {
    title: "Settings",
    render: () => <ThemeSettingsPanel />,
  },
}

const editorFactories: Record<EditorTab["type"], EditorFactory> = {
  flow: {
    type: "flow",
    render: () => <FlowCanvas />,
  },
  code: {
    type: "code",
    render: () => <CodeEditorPlaceholder />,
  },
  welcome: {
    type: "welcome",
    render: () => <WelcomeEditor />,
  },
}

const panelAdapters: Record<PanelTab["type"], PanelAdapter> = {
  console: {
    id: "console",
    canOpen: () => true,
    open: () => ({ id: "panel-console", title: "Console", content: <ConsolePanel /> }),
    render: () => <ConsolePanel />,
  },
  problems: {
    id: "problems",
    canOpen: () => true,
    open: () => ({ id: "panel-problems", title: "Problems", content: <ProblemsPanel /> }),
    render: () => <ProblemsPanel />,
  },
  charts: {
    id: "charts",
    canOpen: () => true,
    open: () => ({ id: "panel-charts", title: "Charts", content: <ChartsPanel /> }),
    render: () => <ChartsPanel />,
  },
}

function MenuBarHost() {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {topMenuItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className="rounded-md px-2 py-1 text-xs font-medium text-[var(--workbench-topbar-foreground)]/80 transition-colors hover:bg-accent hover:text-foreground"
          title={item.children?.map((child) => child.label).join(" · ")}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function ToolbarHost({ onAction }: { onAction: (actionId: string) => void }) {
  return (
    <div className="flex items-center gap-1 border-l border-border/80 pl-3">
      {toolbarActions.map((action) => {
        const Icon = action.icon

        return (
          <Button
            key={action.id}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onAction(action.actionId)}
          >
            {Icon ? <Icon className="size-4" /> : null}
            {action.label}
          </Button>
        )
      })}

      <ThemeToggleAction />
    </div>
  )
}

function ActivityBarHost({
  items,
  activeActivity,
  onSelect,
}: {
  items: ActivityItem[]
  activeActivity: WorkbenchActivityId
  onSelect: (id: WorkbenchActivityId) => void
}) {
  return (
    <aside className="flex w-12 shrink-0 flex-col items-center justify-between border-r border-border bg-[var(--workbench-activity)] py-2">
      <div className="flex w-full flex-col items-center gap-1">
        {items
          .slice()
          .sort((left, right) => left.order - right.order)
          .map((item) => {
            const Icon = item.icon
            const active = activeActivity === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-lg border text-[var(--workbench-activity-foreground)] transition-colors",
                  active
                    ? "border-primary/30 bg-primary/15 text-primary"
                    : "border-transparent hover:bg-accent hover:text-foreground",
                ].join(" ")}
                title={item.title}
              >
                <Icon className="size-[18px]" />
              </button>
            )
          })}
      </div>

      <div className="pb-1">
        <Search className="size-4 text-muted-foreground" />
      </div>
    </aside>
  )
}

function SidePanelHost({
  activeActivity,
  open,
  onToggle,
}: {
  activeActivity: WorkbenchActivityId
  open: boolean
  onToggle: () => void
}) {
  if (!open) {
    return null
  }

  const view = sidePanelViews[activeActivity]

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-[var(--workbench-sidepanel)]">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {view.title}
        </div>

        <Button type="button" variant="ghost" size="icon-xs" onClick={onToggle}>
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">{view.render()}</div>
    </aside>
  )
}

function EditorAreaHost() {
  const activeEditorTabId = useWorkbenchStore((state) => state.activeEditorTabId)
  const editorTabs = useWorkbenchStore((state) => state.editorTabs)
  const closeEditorTab = useWorkbenchStore((state) => state.closeEditorTab)
  const setActiveEditorTab = useWorkbenchStore((state) => state.setActiveEditorTab)

  const activeTab = editorTabs.find((tab) => tab.id === activeEditorTabId) ?? editorTabs[0]
  const activeFactory = editorFactories[activeTab.type]

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[var(--workbench-editor)]">
      <div className="flex items-end gap-1 overflow-x-auto border-b border-border bg-[var(--workbench-tab)] px-2 pt-2">
        {editorTabs.map((tab) => {
          const isActive = tab.id === activeTab.id

          return (
            <div
              key={tab.id}
              className={[
                "flex min-w-0 items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 text-sm",
                isActive
                  ? "bg-[var(--workbench-tab-active)] text-foreground"
                  : "bg-background/40 text-muted-foreground",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => setActiveEditorTab(tab.id)}
                className="truncate"
              >
                {tab.title}
              </button>

              {tab.closable ? (
                <button
                  type="button"
                  onClick={() => closeEditorTab(tab.id)}
                  className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  ×
                </button>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="min-h-0 flex-1">
        {activeFactory.render({ tabId: activeTab.id, payload: activeTab.payload })}
      </div>
    </section>
  )
}

function BottomPanelHost({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  const panelTabs = useWorkbenchStore((state) => state.panelTabs)
  const activePanelTabId = useWorkbenchStore((state) => state.activePanelTabId)
  const setActivePanelTab = useWorkbenchStore((state) => state.setActivePanelTab)

  if (!open) {
    return null
  }

  const activeTab = panelTabs.find((tab) => tab.id === activePanelTabId) ?? panelTabs[0]
  const activePanel = panelAdapters[activeTab.type]

  return (
    <section className="flex h-64 shrink-0 flex-col border-t border-border bg-[var(--workbench-bottom)]">
      <div className="flex items-center justify-between border-b border-border px-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {panelTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePanelTab(tab.id)}
              className={[
                "rounded-md px-3 py-2 text-xs font-medium transition-colors",
                tab.id === activeTab.id
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              ].join(" ")}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <Button type="button" variant="ghost" size="icon-xs" onClick={onToggle}>
          <ChevronRight className="size-4 rotate-90" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">{activePanel.render()}</div>
    </section>
  )
}

function InspectorHost({
  open,
  onToggle,
  activeActivity,
}: {
  open: boolean
  onToggle: () => void
  activeActivity: WorkbenchActivityId
}) {
  const editorTabs = useWorkbenchStore((state) => state.editorTabs)
  const activeEditorTabId = useWorkbenchStore((state) => state.activeEditorTabId)
  const activeTab = editorTabs.find((tab) => tab.id === activeEditorTabId) ?? editorTabs[0]

  if (!open) {
    return null
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-border bg-[var(--workbench-inspector)]">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Inspector
        </div>

        <Button type="button" variant="ghost" size="icon-xs" onClick={onToggle}>
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <PropertyPanel
          activityTitle={sidePanelViews[activeActivity].title}
          activeTabTitle={activeTab.title}
          activeTabType={activeTab.type}
        />
      </div>
    </aside>
  )
}

export default function WorkbenchShell() {
  const activeActivity = useWorkbenchStore((state) => state.activeActivity)
  const sidePanelOpen = useWorkbenchStore((state) => state.sidePanelOpen)
  const bottomPanelOpen = useWorkbenchStore((state) => state.bottomPanelOpen)
  const inspectorOpen = useWorkbenchStore((state) => state.inspectorOpen)
  const setActiveActivity = useWorkbenchStore((state) => state.setActiveActivity)
  const toggleSidePanel = useWorkbenchStore((state) => state.toggleSidePanel)
  const toggleBottomPanel = useWorkbenchStore((state) => state.toggleBottomPanel)
  const toggleInspector = useWorkbenchStore((state) => state.toggleInspector)
  const openPanelTab = useWorkbenchStore((state) => state.openPanelTab)

  const onDispatchAction = (actionId: string) => {
    switch (actionId) {
      case "view.toggleSidePanel":
        toggleSidePanel()
        break
      case "view.toggleBottomPanel":
        toggleBottomPanel()
        break
      case "workbench.focusConsole":
      case "run.start":
      case "run.stop":
      case "file.new":
      case "file.open":
      case "file.save":
      default:
        openPanelTab("panel-console")
        break
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-background text-foreground">
      <WindowTitleBar
        title="Simuless Studio"
        className="border-b border-border bg-[var(--workbench-topbar)] text-[var(--workbench-topbar-foreground)]"
        leftSlot={
          <div className="flex items-center gap-3 pr-2">
            <MenuBarHost />
            <ToolbarHost onAction={onDispatchAction} />
          </div>
        }
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <ActivityBarHost
          items={activityItems}
          activeActivity={activeActivity}
          onSelect={setActiveActivity}
        />

        <SidePanelHost
          activeActivity={activeActivity}
          open={sidePanelOpen}
          onToggle={toggleSidePanel}
        />

        {!sidePanelOpen ? (
          <div className="flex w-8 shrink-0 items-start justify-center border-r border-border bg-[var(--workbench-sidepanel)] py-2">
            <Button type="button" variant="ghost" size="icon-xs" onClick={toggleSidePanel}>
              <LayoutPanelLeft className="size-4" />
            </Button>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <EditorAreaHost />

          <BottomPanelHost open={bottomPanelOpen} onToggle={toggleBottomPanel} />

          {!bottomPanelOpen ? (
            <div className="flex h-9 shrink-0 items-center justify-between border-t border-border bg-[var(--workbench-bottom)] px-2">
              <div className="text-xs text-muted-foreground">Bottom panel hidden</div>
              <Button type="button" variant="ghost" size="sm" onClick={toggleBottomPanel}>
                <ChevronUp className="size-4" />
                Show Panels
              </Button>
            </div>
          ) : null}
        </div>

        <InspectorHost
          open={inspectorOpen}
          onToggle={toggleInspector}
          activeActivity={activeActivity}
        />

        {!inspectorOpen ? (
          <div className="flex w-8 shrink-0 items-start justify-center border-l border-border bg-[var(--workbench-inspector)] py-2">
            <Button type="button" variant="ghost" size="icon-xs" onClick={toggleInspector}>
              <Settings2 className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
