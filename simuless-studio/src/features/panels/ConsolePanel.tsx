import { TerminalSquare, Workflow, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"

const consoleEntries = [
  {
    level: "INFO",
    source: "workbench",
    message: "Workbench shell initialized with panel adapters.",
  },
  {
    level: "INFO",
    source: "theme",
    message: "Theme provider mounted. Light / dark / system available.",
  },
  {
    level: "TODO",
    source: "runtime",
    message: "Wire this panel to the system console adapter when IPC is ready.",
  },
]

export default function ConsolePanel() {
  return (
    <div className="flex h-full flex-col bg-[var(--workbench-bottom)]">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <TerminalSquare className="size-4" />
          <span>System Console Adapter</span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="xs" variant="outline" disabled>
            Launch Host Console
          </Button>
          <Button size="xs" variant="ghost" disabled>
            Attach Runtime
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-b border-border px-3 py-2 text-xs">
        <div className="rounded-lg border border-border bg-background/70 p-2">
          <div className="mb-1 flex items-center gap-2 text-muted-foreground">
            <TerminalSquare className="size-3.5" />
            Console
          </div>
          <div className="font-medium">External host terminal</div>
        </div>

        <div className="rounded-lg border border-border bg-background/70 p-2">
          <div className="mb-1 flex items-center gap-2 text-muted-foreground">
            <Workflow className="size-3.5" />
            Runtime
          </div>
          <div className="font-medium">Panel adapter ready</div>
        </div>

        <div className="rounded-lg border border-border bg-background/70 p-2">
          <div className="mb-1 flex items-center gap-2 text-muted-foreground">
            <Wrench className="size-3.5" />
            Extensibility
          </div>
          <div className="font-medium">Charts / Problems can plug in later</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 font-mono text-xs">
        {consoleEntries.map((entry) => (
          <div
            key={`${entry.source}:${entry.message}`}
            className="flex gap-3 border-b border-border/60 py-2 last:border-b-0"
          >
            <span className="w-14 shrink-0 text-muted-foreground">{entry.level}</span>
            <span className="w-20 shrink-0 text-muted-foreground">{entry.source}</span>
            <span className="text-foreground/90">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
