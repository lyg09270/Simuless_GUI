import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface ScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  dataX?: number[];
  dataY?: number[];
}

let Plot: any = null;

export default function ScopeModal({
  isOpen,
  onClose,
  title,
  dataX,
  dataY,
}: ScopeModalProps) {
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

  if (!isOpen) return null;

  // Mock data for visualization if not provided
  const x = dataX || Array.from({ length: 100 }, (_, i) => i * 0.1);
  const y = dataY || Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1));

  const isDark = document.documentElement.classList.contains("dark");

  const plotData = [
    {
      x,
      y,
      type: "scatter",
      mode: "lines",
      name: "Signal",
      line: { color: "#3b82f6", width: 2 },
      fill: "tozeroy",
      fillcolor: "rgba(59, 130, 246, 0.2)",
    },
  ];

  const plotLayout = {
    title,
    xaxis: { title: "Time (s)" },
    yaxis: { title: "Amplitude" },
    margin: { l: 50, r: 50, t: 50, b: 50 },
    paper_bgcolor: isDark ? "#1e293b" : "#ffffff",
    plot_bgcolor: isDark ? "#0f172a" : "#f8fafc",
    font: { color: isDark ? "#e2e8f0" : "#1f2937", size: 12 },
    showlegend: true,
    hovermode: "x unified",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-2xl w-11/12 h-5/6 max-w-6xl flex flex-col border border-border">
        {/* Header */}
        <div className="flex items-center justify-between h-14 border-b border-border px-6 flex-shrink-0">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-sidebar-accent transition-colors text-foreground"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plot */}
        <div className="flex-1 overflow-auto p-4">
          {plotAvailable ? (
            <Plot
              data={plotData}
              layout={plotLayout}
              config={{
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <p className="mb-2">Plotly library not available</p>
                <p className="text-sm">Data points: {y.length}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-muted-foreground">
            {y.length} data points | X: {x[0]?.toFixed(2)} to {x[x.length - 1]?.toFixed(2)} | Y: {Math.min(...y).toFixed(2)} to {Math.max(...y).toFixed(2)}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
