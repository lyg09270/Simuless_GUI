import { useState, useEffect } from "react";

interface ScopeWindowProps {
  title: string;
  initialDataX?: number[];
  initialDataY?: number[];
}

let Plot: any = null;

export default function ScopeWindow({
  title,
  initialDataX,
  initialDataY,
}: ScopeWindowProps) {
  const [plotAvailable, setPlotAvailable] = useState(false);
  const [dataX, setDataX] = useState<number[]>(
    initialDataX || Array.from({ length: 100 }, (_, i) => i * 0.1)
  );
  const [dataY, setDataY] = useState<number[]>(
    initialDataY || Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1))
  );

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

  // Listen for simulation data from parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "SIMULATION_DATA") {
        const { dataX: newDataX, dataY: newDataY } = event.data.data;
        if (newDataX && newDataY) {
          setDataX(newDataX);
          setDataY(newDataY);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const isDark = document.documentElement.classList.contains("dark");

  const plotData = [
    {
      x: dataX,
      y: dataY,
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
    <div className="w-full h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border px-6 flex items-center flex-shrink-0 bg-sidebar">
        <h1 className="text-lg font-semibold text-sidebar-foreground">{title}</h1>
      </div>

      {/* Plot Container */}
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
      <div className="border-t border-border px-6 py-3 bg-sidebar text-sidebar-foreground flex items-center justify-between flex-shrink-0">
        <span className="text-xs text-sidebar-foreground/75">
          Data: {dataY.length} points | X: [{dataX[0]?.toFixed(2)}, {dataX[dataX.length - 1]?.toFixed(2)}] | Y: [{Math.min(...dataY).toFixed(2)}, {Math.max(...dataY).toFixed(2)}]
        </span>
      </div>
    </div>
  );
}
