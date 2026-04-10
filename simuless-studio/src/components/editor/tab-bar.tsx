import { X } from "lucide-react";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";

export default function TabBar() {
  const tabs = useStudioStore((state) => state.tabs);
  const activeTabId = useStudioStore((state) => state.activeTabId);
  const setActiveTab = useStudioStore((state) => state.setActiveTab);
  const closeTab = useStudioStore((state) => state.closeTab);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="h-10 border-b border-border bg-sidebar flex items-center gap-1 px-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-t text-sm font-medium whitespace-nowrap transition-colors group",
            activeTabId === tab.id
              ? "bg-card text-card-foreground border-b-2 border-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <span className="truncate max-w-[150px]">{tab.fileName}</span>
          {tab.isDirty && <span className="w-2 h-2 rounded-full bg-primary" />}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-sidebar-accent p-0.5"
          >
            <X size={14} />
          </button>
        </button>
      ))}
    </div>
  );
}
