import { Handle, Position } from "reactflow";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

// Dynamically import Plotly
let Plot: any = null;

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
  const [showPlot, setShowPlot] = useState(false);
  const [plotAvailable, setPlotAvailable] = useState(false);

  useEffect(() => {
    if (!Plot) {
      try {
        Plot = require("react-plotly.js").default;
        setPlotAvailable(true);
      } catch (e) {
        console.warn("Plotly not available");
      }
    } else {
      setPlotAvailable(true);
    }
  }, []);

  // Mock data for visualization if not provided
  const dataX = data.dataX || Array.from({ length: 100 }, (_, i) => i * 0.1);
  const dataY = data.dataY || Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1));

  const plotData = [
    {
      x: dataX,
      y: dataY,
      type: "scatter",
      mode: "lines",
      name: "Signal",
      line: { color: "#3b82f6", width: 2 },
    },
  ];

  const isDark = document.documentElement.classList.contains("dark");

  const plotLayout = {
    title: data.label,
    xaxis: { title: "Time (s)" },
    yaxis: { title: "Amplitude" },
    margin: { l: 40, r: 20, t: 40, b: 40 },
    paper_bgcolor: "transparent",
    plot_bgcolor: isDark ? "#1e293b" : "#f5f5f5",
    font: { color: isDark ? "#e2e8f0" : "#1f2937" },
    height: 300,
    showlegend: true,
  };

  return (
    <div
      className={cn(
        "rounded border-2 bg-card text-card-foreground shadow-md transition-all min-w-max",
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

      <div className="px-4 py-3 min-w-[200px]">
        <div className="text-sm font-semibold mb-2">{data.label}</div>

        {/* Scope visualization */}
        {showPlot && plotAvailable ? (
          <div className="mb-2">
            <Plot
              data={plotData}
              layout={plotLayout}
              config={{
                responsive: true,
                displayModeBar: false,
                staticPlot: true,
              }}
            />
          </div>
        ) : (
          <div className="w-48 h-24 bg-sidebar border border-sidebar-border rounded flex items-center justify-center">
            <button
              onClick={() => setShowPlot(!showPlot)}
              className="text-xs text-sidebar-foreground/75 hover:text-sidebar-foreground transition-colors"
            >
              {showPlot ? "Hide" : "Show"} Signal
            </button>
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-1">
          Data points: {dataY.length}
        </div>
      </div>

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
