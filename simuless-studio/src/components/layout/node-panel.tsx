import {
  Network,
  Code2,
  Settings,
  ChevronDown,
  Trash2,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useStudioStore } from "@/store/studio-store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { nodeCategories } from "@/lib/node-categories";
import type { FileItem } from "@/types/graph";

export default function NodePanel() {
  const mode = useStudioStore((state) => state.mode);
  const setMode = useStudioStore((state) => state.setMode);
  const language = useStudioStore((state) => state.language);
  const nodes = useStudioStore((state) => state.nodes);
  const deleteNode = useStudioStore((state) => state.deleteNode);
  const workingDirectory = useStudioStore((state) => state.workingDirectory);
  const fileTree = useStudioStore((state) => state.fileTree);
  const openTab = useStudioStore((state) => state.openTab);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(nodeCategories.map((c) => c.id))
  );
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["/workspace"])
  );

  const toggleCategory = (categoryId: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId);
    } else {
      newSet.add(categoryId);
    }
    setExpandedCategories(newSet);
  };

  const toggleFolder = (path: string) => {
    const newSet = new Set(expandedFolders);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    setExpandedFolders(newSet);
  };

  const handleDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("nodeType", nodeType);
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === "file") {
      const tabId = `tab-${file.path}`;
      const extension = file.name.split(".").pop()?.toLowerCase();
      let language: "python" | "typescript" | "javascript" | "json" = "python";

      if (extension === "ts") language = "typescript";
      else if (extension === "js") language = "javascript";
      else if (extension === "json") language = "json";
      else if (extension === "yaml" || extension === "yml") language = "python";
      else if (extension === "md") language = "python";

      openTab({
        id: tabId,
        filePath: file.path,
        fileName: file.name,
        content: "", // Will be loaded by code-editor component
        isDirty: false,
        language,
      });
    }
  };

  const renderFileTree = (files: FileItem[], depth: number = 0) => {
    return (
      <div style={{ marginLeft: `${depth * 12}px` }} className="space-y-1">
        {files.map((file) => (
          <div key={file.path}>
            {file.type === "directory" ? (
              <>
                <button
                  onClick={() => toggleFolder(file.path)}
                  className="flex items-center gap-1 w-full px-2 py-1 rounded hover:bg-sidebar-accent text-sidebar-foreground text-sm transition-colors"
                >
                  {expandedFolders.has(file.path) ? (
                    <FolderOpen size={14} />
                  ) : (
                    <Folder size={14} />
                  )}
                  <span className="truncate">{file.name}</span>
                </button>
                {expandedFolders.has(file.path) && file.children && (
                  renderFileTree(file.children, depth + 1)
                )}
              </>
            ) : (
              <button
                onClick={() => handleFileClick(file)}
                className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-sidebar-accent text-sidebar-foreground text-sm transition-colors"
              >
                <FileText size={14} />
                <span className="truncate">{file.name}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    );
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
          // Graph Mode: Hierarchical Node Library (Simulink style)
          <div className="p-3">
            {nodeCategories.map((category) => {
              const Icon = category.icon;
              const isExpanded = expandedCategories.has(category.id);
              return (
                <div key={category.id} className="mb-3">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded hover:bg-sidebar-accent/50 text-sidebar-foreground transition-colors mb-1"
                  >
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform flex-shrink-0",
                        !isExpanded && "-rotate-90"
                      )}
                    />
                    <Icon size={14} className="flex-shrink-0" />
                    <span className="font-semibold text-xs uppercase opacity-75">
                      {category.name}
                    </span>
                  </button>

                  {isExpanded && category.children && (
                    <div className="space-y-1 pl-4">
                      {category.children.map((node) => (
                        <div
                          key={node.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, node.id)}
                          className="p-2 rounded bg-sidebar-accent/50 text-sidebar-accent-foreground cursor-move hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors text-xs font-medium"
                          title={node.description}
                        >
                          <div className="truncate">{node.label}</div>
                          {node.description && (
                            <div className="text-xs opacity-75 truncate">
                              {node.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Current Canvas Nodes */}
            {nodes.length > 0 && (
              <div className="border-t border-sidebar-border pt-3 mt-3">
                <div className="text-xs font-semibold text-sidebar-foreground uppercase opacity-75 mb-2">
                  Canvas ({nodes.length})
                </div>
                <div className="space-y-1">
                  {nodes.map((node) => (
                    <div
                      key={node.id}
                      className="flex items-center justify-between p-2 rounded bg-sidebar-accent/50 hover:bg-sidebar-accent group text-xs"
                    >
                      <span className="text-sidebar-accent-foreground truncate">
                        {node.data.label}
                      </span>
                      <button
                        onClick={() => deleteNode(node.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive p-0.5"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Code Mode: File Browser
          <div className="p-3">
            <div className="text-xs font-semibold text-sidebar-foreground uppercase opacity-75 mb-2">
              {workingDirectory}
            </div>
            {fileTree.length > 0 ? (
              renderFileTree(fileTree)
            ) : (
              <div className="text-xs text-sidebar-foreground/50 p-2">
                No files found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
