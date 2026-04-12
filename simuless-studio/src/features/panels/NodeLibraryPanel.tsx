import type { DragEvent } from "react"

import { Boxes, CircleGauge, Orbit, Sigma } from "lucide-react"

import { nodeLibrary } from "@/features/flow/nodeLibrary"

const iconByCategory = {
  Sources: Orbit,
  Math: Sigma,
  Control: CircleGauge,
  Visualization: Boxes,
} as const

export default function NodeLibraryPanel() {
  const onDragStart = (event: DragEvent<HTMLButtonElement>, label: string, type: string) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        type: "base",
        label,
        nodeType: type,
      })
    )
    event.dataTransfer.setData("text/plain", label)
    event.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div className="flex h-full flex-col bg-[var(--workbench-sidepanel)]">
      <div className="border-b border-border px-3 py-2">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Node Palette
        </div>
        <div className="mt-1 text-sm text-foreground/80">
          Drag blocks into the flow editor tab.
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-3">
        {nodeLibrary.map((group) => {
          const Icon = iconByCategory[group.category as keyof typeof iconByCategory]

          return (
            <section key={group.category} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <Icon className="size-3.5" />
                {group.category}
              </div>

              <div className="space-y-2">
                {group.nodes.map((node) => (
                  <button
                    key={node.type}
                    type="button"
                    draggable
                    onDragStart={(event) => onDragStart(event, node.label, node.type)}
                    className="flex w-full cursor-grab items-center justify-between rounded-lg border border-border bg-background/70 px-3 py-2 text-left text-sm transition-colors hover:bg-accent active:cursor-grabbing"
                  >
                    <span className="font-medium">{node.label}</span>
                    <span className="text-xs text-muted-foreground">{node.type}</span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
