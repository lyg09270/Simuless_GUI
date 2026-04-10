import { useEffect, useState } from "react";
import { useStudioStore } from "@/store/studio-store";
import TabBar from "./tab-bar";
import { getMockFileContent } from "@/lib/file-system";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeEditor() {
  const tabs = useStudioStore((state) => state.tabs);
  const activeTabId = useStudioStore((state) => state.activeTabId);
  const updateTabContent = useStudioStore((state) => state.updateTabContent);
  const [isEditing, setIsEditing] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Load file content when tab is opened
  useEffect(() => {
    if (activeTab && (!activeTab.content || activeTab.content === "// File content here")) {
      const content = getMockFileContent(activeTab.filePath);
      updateTabContent(activeTab.id, content);
    }
  }, [activeTab?.id]);

  const getLanguage = () => {
    if (!activeTab?.language) return "text";
    const languageMap: Record<string, string> = {
      python: "python",
      typescript: "typescript",
      javascript: "javascript",
      json: "json",
    };
    return languageMap[activeTab.language] || "text";
  };

  return (
    <div className="w-full h-full flex flex-col bg-background overflow-hidden">
      <TabBar />

      {activeTab ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Toggle Button */}
          <div className="h-8 border-b border-border px-3 flex items-center gap-2 bg-sidebar flex-shrink-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs px-2 py-1 rounded bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
            >
              {isEditing ? "View" : "Edit"}
            </button>
            <span className="text-xs text-sidebar-foreground/50">
              {activeTab.language}
            </span>
          </div>

          {/* Code Display Area */}
          {isEditing ? (
            <div className="flex-1 overflow-hidden">
              <textarea
                value={activeTab.content}
                onChange={(e) => updateTabContent(activeTabId!, e.target.value)}
                className="w-full h-full px-4 py-3 bg-card text-card-foreground font-mono text-sm resize-none focus:outline-none border-none"
                placeholder="// Start typing..."
                spellCheck="false"
              />
            </div>
          ) : (
            <div className="flex-1 overflow-auto bg-card">
              <SyntaxHighlighter
                language={getLanguage()}
                style={atomOneDark}
                showLineNumbers
                wrapLines
                className="!bg-card !m-0 !p-4 !font-mono !text-sm"
              >
                {activeTab.content}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground bg-card">
          No files open
        </div>
      )}
    </div>
  );
}
