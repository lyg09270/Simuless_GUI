import {
  Network,
  Code2,
  Settings,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import { useStudioStore } from "@/store/studio-store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nodeTypes = [
  { id: "gain", label: "node.gain" },
  { id: "integrator", label: "node.integrator" },
  { id: "differentiator", label: "node.differentiator" },
  { id: "sum", label: "node.sum" },
  { id: "scope", label: "node.scope" },
  { id: "input", label: "node.input" },
  { id: "output", label: "node.output" },
];

export default function NodePanel() {
  const mode = useStudioStore((state) => state.mode);
  const setMode = useStudioStore((state) => state.setMode);
  const language = useStudioStore((state) => state.language);
  const nodes = useStudioStore((state) => state.nodes);
  const deleteNode = useStudioStore((state) => state.deleteNode);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "available"
  );

  const handleDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("nodeType", nodeType);
  };

  return (
    <div className="w-64 border-r border-border bg-sidebar flex flex-col h-full overflow-hidden">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-border p-2">
        <button
          onClick={() => setMode("graph")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors",
            mode === "graph"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
          title={t("sidebar.graph", language)}
        >
          <Network size={16} />
          <span className="hidden sm:inline">{t("sidebar.graph", language)}</span>
        </button>
        <button
          onClick={() => setMode("code")}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors",
            mode === "code"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
          title={t("sidebar.code", language)}
        >
          <Code2 size={16} />
          <span className="hidden sm:inline">{t("sidebar.code", language)}</span>
        </button>
        <div className="flex-1" />
        <button
          className="p-1.5 rounded hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          title={t("sidebar.settings", language)}
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        {mode === "graph" ? (
          // Graph Mode: Node Library
          <div className="p-4">
            {/* Available Nodes */}
            <div className="mb-4">
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === "available" ? null : "available"
                  )
                }
                className="flex items-center gap-2 w-full text-sidebar-foreground hover:text-sidebar-primary mb-2 transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform",
                    expandedCategory !== "available" && "-rotate-90"
                  )}
                />
                <span className="font-semibold text-sm">
                  {t("sidebar.nodeLibrary", language)}
                </span>
              </button>

              {expandedCategory === "available" && (
                <div className="space-y-2 ml-2">
                  {nodeTypes.map((nodeType) => (
                    <div
                      key={nodeType.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, nodeType.id)}
                      className="p-2 rounded bg-sidebar-accent text-sidebar-accent-foreground cursor-move hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors text-sm"
                    >
                      {t(nodeType.label as any, language)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Current Nodes */}
            {nodes.length > 0 && (
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-sidebar-foreground">
                    Canvas Nodes ({nodes.length})
                  </span>
                </div>
                <div className="space-y-1">
                  {nodes.map((node) => (
                    <div
                      key={node.id}
                      className="flex items-center justify-between p-2 rounded bg-sidebar-accent/50 hover:bg-sidebar-accent group"
                    >
                      <span className="text-xs text-sidebar-accent-foreground truncate">
                        {node.data.label} ({node.id})
                      </span>
                      <button
                        onClick={() => deleteNode(node.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive p-0.5"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Code Mode: File Tree or Editor Info
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <button className="p-1.5 rounded hover:bg-sidebar-accent text-sidebar-foreground transition-colors">
                <Plus size={16} />
              </button>
              <span className="text-sm font-semibold text-sidebar-foreground">
                Files
              </span>
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded bg-sidebar-accent/50 text-sidebar-accent-foreground text-xs">
                code-mode-coming-soon.ts
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
