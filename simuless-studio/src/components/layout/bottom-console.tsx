import { useRef, useEffect, useState } from "react";
import { Trash2, ChevronUp } from "lucide-react";
import { useCLI } from "@/lib/cli";
import { t } from "@/lib/i18n";
import { useStudioStore } from "@/store/studio-store";
import { cn } from "@/lib/utils";

export default function BottomConsole() {
  const messages = useCLI((state) => state.messages);
  const addMessage = useCLI((state) => state.addMessage);
  const clear = useCLI((state) => state.clear);
  const execute = useCLI((state) => state.execute);

  const language = useStudioStore((state) => state.language);
  const nodes = useStudioStore((state) => state.nodes);

  const [input, setInput] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await execute(input);

    setInput("");
    inputRef.current?.focus();
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-destructive";
      case "success":
        return "text-green-500 dark:text-green-400";
      case "warn":
        return "text-yellow-600 dark:text-yellow-400";
      case "info":
        return "text-blue-500 dark:text-blue-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <div
      className={cn(
        "border-t border-border bg-background flex flex-col transition-all",
        isCollapsed ? "h-12" : "h-48"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-12 border-b border-border px-4 flex-shrink-0 bg-sidebar">
        <span className="text-sm font-semibold text-sidebar-foreground">
          {t("console.title", language)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => clear()}
            className="p-1 rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground text-xs"
            title={t("console.clear", language)}
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          >
            <ChevronUp
              size={16}
              className={cn(
                "transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isCollapsed && (
        <>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 bg-card text-card-foreground">
            {messages.length === 0 ? (
              <div className="text-muted-foreground">
                {t("console.ready", language)}
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <span className="text-muted-foreground flex-shrink-0">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                  <span
                    className={cn("flex-1 break-words", getMessageColor(msg.type))}
                  >
                    {msg.message}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border px-3 py-2 bg-sidebar"
          >
            <span className="text-xs text-sidebar-foreground/60">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command (help for list)..."
              className="flex-1 bg-transparent text-foreground text-xs focus:outline-none placeholder-muted-foreground"
              autoFocus
            />
          </form>
        </>
      )}
    </div>
  );
}
