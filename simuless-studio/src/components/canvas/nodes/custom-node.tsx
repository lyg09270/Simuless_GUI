import { Handle, Position } from "reactflow";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";

interface CustomNodeProps {
  data: { label: string };
  id: string;
  isConnecting?: boolean;
  selected?: boolean;
}

export default function CustomNode({
  data,
  id,
  isConnecting,
  selected,
}: CustomNodeProps) {
  const selectedNodeId = useStudioStore((state) => state.selectedNodeId);
  const isSelected = selectedNodeId === id;

  return (
    <div
      className={cn(
        "px-4 py-2 rounded border-2 bg-card text-card-foreground shadow-md transition-all",
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={!isConnecting}
        className={cn(
          "h-2 w-2 rounded-full",
          isSelected ? "bg-primary" : "bg-muted"
        )}
      />
      <div className="text-sm font-medium whitespace-nowrap">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={!isConnecting}
        className={cn(
          "h-2 w-2 rounded-full",
          isSelected ? "bg-primary" : "bg-muted"
        )}
      />
    </div>
  );
}
