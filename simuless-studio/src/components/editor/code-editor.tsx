import { useEffect } from "react";
import { useStudioStore } from "@/store/studio-store";
import TabBar from "./tab-bar";
import { getMockFileContent } from "@/lib/file-system";

export default function CodeEditor() {
  const tabs = useStudioStore((state) => state.tabs);
  const activeTabId = useStudioStore((state) => state.activeTabId);
  const updateTabContent = useStudioStore((state) => state.updateTabContent);

  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Load file content when tab is opened
  useEffect(() => {
    if (activeTab && (!activeTab.content || activeTab.content === "// File content here")) {
      const content = getMockFileContent(activeTab.filePath);
      updateTabContent(activeTab.id, content);
    }
  }, [activeTab?.id]);

  return (
    <div className="w-full h-full flex flex-col bg-background overflow-hidden">
      <TabBar />

      {activeTab ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <textarea
            value={activeTab.content}
            onChange={(e) => updateTabContent(activeTabId!, e.target.value)}
            className="flex-1 px-4 py-3 bg-card text-card-foreground font-mono text-sm resize-none focus:outline-none border-none"
            placeholder="// Start typing..."
            spellCheck="false"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          No files open
        </div>
      )}
    </div>
  );
}
