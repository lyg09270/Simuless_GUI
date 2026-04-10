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
        "px-4 py-3 rounded-lg border-2 shadow-lg transition-all",
        "bg-card text-card-foreground",
        isSelected
          ? "border-primary shadow-lg shadow-primary/30"
          : "border-border hover:border-primary/60 hover:shadow-md"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={!isConnecting}
        className={cn(
          "h-2.5 w-2.5 rounded-full transition-colors",
          isSelected ? "bg-primary" : "bg-muted-foreground/60"
        )}
      />
      <div className="text-sm font-semibold whitespace-nowrap">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={!isConnecting}
        className={cn(
          "h-2.5 w-2.5 rounded-full transition-colors",
          isSelected ? "bg-primary" : "bg-muted-foreground/60"
        )}
      />
    </div>
  );
}
