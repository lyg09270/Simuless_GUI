import { Handle, Position, type NodeProps } from "@xyflow/react"

export default function BaseNode({ data }: NodeProps) {
  return (
    <div className="min-w-40 rounded-xl border border-border bg-card px-4 py-3 text-card-foreground shadow-sm">
      <Handle type="target" position={Position.Left} />

      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Block</div>
      <div className="mt-1 font-medium">{String(data.label)}</div>

      <Handle type="source" position={Position.Right} />
    </div>
  )
}
