import { Handle, Position } from "reactflow";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";

interface CustomNodeProps {
  data: {
    label: string;
    nodeType?: "source" | "sink" | "normal";
  };
  id: string;
  isConnecting?: boolean;
  selected?: boolean;
}

// Determine node type based on label
const getNodeType = (label: string): "source" | "sink" | "normal" => {
  const lowerLabel = label.toLowerCase();

  // Source nodes - have output only
  if (
    ["input", "constant", "ramp", "sine"].some((n) =>
      lowerLabel.includes(n)
    )
  ) {
    return "source";
  }

  // Sink nodes - have input only
  if (["scope", "output", "display", "to-file"].some((n) => lowerLabel.includes(n))) {
    return "sink";
  }

  return "normal";
};

export default function CustomNode({
  data,
  id,
  isConnecting,
}: CustomNodeProps) {
  const selectedNodeId = useStudioStore((state) => state.selectedNodeId);
  const isSelected = selectedNodeId === id;
  const nodeType = getNodeType(data.label);

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
      {/* Input handle - only for normal and sink nodes */}
      {nodeType !== "source" && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={!isConnecting}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            isSelected ? "bg-primary" : "bg-muted-foreground/60"
          )}
        />
      )}

      <div className="text-sm font-semibold whitespace-nowrap">{data.label}</div>

      {/* Output handle - only for normal and source nodes */}
      {nodeType !== "sink" && (
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={!isConnecting}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors",
            isSelected ? "bg-primary" : "bg-muted-foreground/60"
          )}
        />
      )}
    </div>
  );
}
