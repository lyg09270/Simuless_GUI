import { Handle, Position } from "reactflow";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ScopeModal from "./scope-modal";

interface ScopeNodeProps {
  data: {
    label: string;
    dataX?: number[];
    dataY?: number[];
    [key: string]: any;
  };
  id: string;
  isConnecting?: boolean;
}

export default function ScopeNode({ data, id, isConnecting }: ScopeNodeProps) {
  const selectedNodeId = useStudioStore((state) => state.selectedNodeId);
  const isSelected = selectedNodeId === id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for visualization if not provided
  const dataX = data.dataX || Array.from({ length: 100 }, (_, i) => i * 0.1);
  const dataY = data.dataY || Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1));

  const handleDoubleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onDoubleClick={handleDoubleClick}
        className={cn(
          "px-4 py-3 rounded-lg border-2 shadow-lg transition-all cursor-pointer",
          "bg-card text-card-foreground",
          isSelected
            ? "border-primary shadow-lg shadow-primary/30"
            : "border-border hover:border-primary/60 hover:shadow-md",
          "hover:bg-card/80"
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

        <div className="text-sm font-semibold whitespace-nowrap mb-1">
          {data.label}
        </div>
        <div className="text-xs text-muted-foreground">
          [Double-click to view]
        </div>

      </div>

      <ScopeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={data.label}
        dataX={dataX}
        dataY={dataY}
      />
    </>
  );
}
