import { Trash2, X } from "lucide-react";
import { useStudioStore } from "@/store/studio-store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PropertyPanel() {
  const selectedNodeId = useStudioStore((state) => state.selectedNodeId);
  const nodes = useStudioStore((state) => state.nodes);
  const updateNode = useStudioStore((state) => state.updateNode);
  const deleteNode = useStudioStore((state) => state.deleteNode);
  const selectNode = useStudioStore((state) => state.selectNode);
  const language = useStudioStore((state) => state.language);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const shouldShow = selectedNode && !isCollapsed;

  return (
    <div
      className={cn(
        "border-l border-border bg-sidebar flex flex-col transition-all overflow-hidden",
        shouldShow ? "w-80" : "w-0"
      )}
    >
      {/* Header */}
      {shouldShow && (
        <div className="flex items-center justify-between h-12 border-b border-border px-4 flex-shrink-0">
          <span className="text-sm font-semibold text-sidebar-foreground">
            {t("property.title", language)}
          </span>
          <button
            onClick={() => {
              setIsCollapsed(true);
              selectNode(null);
            }}
            className="p-1 rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4">
          {selectedNode ? (
            <div className="space-y-4">
              {/* Node Info */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-sidebar-foreground uppercase opacity-75">
                  Node Info
                </div>

                {/* ID */}
                <div>
                  <label className="text-xs text-sidebar-foreground/75 block mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    value={selectedNode.id}
                    readOnly
                    className="w-full px-2 py-1 rounded text-xs bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border cursor-default"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="text-xs text-sidebar-foreground/75 block mb-1">
                    {t("property.type", language)}
                  </label>
                  <input
                    type="text"
                    value={selectedNode.type || "custom"}
                    readOnly
                    className="w-full px-2 py-1 rounded text-xs bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border cursor-default"
                  />
                </div>

                {/* Label */}
                <div>
                  <label className="text-xs text-sidebar-foreground/75 block mb-1">
                    {t("property.label", language)}
                  </label>
                  <input
                    type="text"
                    value={selectedNode.data.label || ""}
                    onChange={(e) => {
                      updateNode(selectedNode.id, {
                        data: { ...selectedNode.data, label: e.target.value },
                      });
                    }}
                    className="w-full px-2 py-1 rounded text-xs bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Position */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-sidebar-foreground uppercase opacity-75">
                  {t("property.position", language)}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-sidebar-foreground/75 block mb-1">
                      X
                    </label>
                    <input
                      type="number"
                      value={Math.round(selectedNode.position.x)}
                      onChange={(e) => {
                        updateNode(selectedNode.id, {
                          position: {
                            ...selectedNode.position,
                            x: Number(e.target.value),
                          },
                        });
                      }}
                      className="w-full px-2 py-1 rounded text-xs bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-sidebar-foreground/75 block mb-1">
                      Y
                    </label>
                    <input
                      type="number"
                      value={Math.round(selectedNode.position.y)}
                      onChange={(e) => {
                        updateNode(selectedNode.id, {
                          position: {
                            ...selectedNode.position,
                            y: Number(e.target.value),
                          },
                        });
                      }}
                      className="w-full px-2 py-1 rounded text-xs bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Data Properties */}
              {Object.keys(selectedNode.data).length > 1 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-sidebar-foreground uppercase opacity-75">
                    Custom Properties
                  </div>
                  {Object.entries(selectedNode.data)
                    .filter(([key]) => key !== "label")
                    .map(([key, value]) => (
                      <div key={key}>
                        <label className="text-xs text-sidebar-foreground/75 block mb-1 capitalize">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={String(value)}
                          onChange={(e) => {
                            updateNode(selectedNode.id, {
                              data: {
                                ...selectedNode.data,
                                [key]: e.target.value,
                              },
                            });
                          }}
                          className="w-full px-2 py-1 rounded text-xs bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border focus:border-primary focus:outline-none"
                        />
                      </div>
                    ))}
                </div>
              )}

              {/* Delete Button */}
              <div className="pt-4 border-t border-sidebar-border">
                <button
                  onClick={() => deleteNode(selectedNode.id)}
                  className="w-full flex items-center gap-2 justify-center px-3 py-2 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
                >
                  <Trash2 size={14} />
                  {t("property.delete", language)}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div className="text-sm text-sidebar-foreground/75">
                {t("property.selectNode", language)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
