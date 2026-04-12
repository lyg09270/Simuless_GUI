type PropertyPanelProps = {
  activityTitle: string
  activeTabTitle: string
  activeTabType: string
}

const sections = [
  {
    title: "Selection",
    rows: [
      ["Selected object", "Workbench shell"],
      ["Inspector mode", "Context aware"],
    ],
  },
  {
    title: "Extension Surface",
    rows: [
      ["Editor contract", "EditorView + EditorDocument"],
      ["Panel contract", "PanelAdapter + PanelTab"],
      ["Theme contract", "ThemeController"],
    ],
  },
]

export default function PropertyPanel({
  activityTitle,
  activeTabTitle,
  activeTabType,
}: PropertyPanelProps) {
  return (
    <div className="flex h-full flex-col bg-[var(--workbench-inspector)]">
      <div className="border-b border-border px-3 py-2">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Inspector
        </div>
        <div className="mt-1 text-sm font-medium">{activeTabTitle}</div>
        <div className="text-xs text-muted-foreground">
          Active activity: {activityTitle} · Editor type: {activeTabType}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-3">
        {sections.map((section) => (
          <section key={section.title} className="rounded-lg border border-border bg-background/60">
            <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {section.title}
            </div>

            <div className="space-y-3 px-3 py-3 text-sm">
              {section.rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[110px_1fr] gap-3">
                  <div className="text-muted-foreground">{label}</div>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
