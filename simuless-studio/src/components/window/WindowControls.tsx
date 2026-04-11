import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, Square, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WindowControlsProps = {
  className?: string;
};

export default function WindowControls({ className }: WindowControlsProps) {
  const appWindow = getCurrentWindow();

  const runWindowAction = async (action: () => Promise<void>) => {
    try {
      await action();
    } catch {
      // no-op outside Tauri runtime
    }
  };

  const onMinimize = async () => {
    await runWindowAction(() => appWindow.minimize());
  };

  const onToggleMaximize = async () => {
    await runWindowAction(() => appWindow.toggleMaximize());
  };

  const onClose = async () => {
    await runWindowAction(() => appWindow.close());
  };

  return (
    <div className={cn("flex items-center gap-1 px-2", className)} data-no-drag>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-md"
        onClick={onMinimize}
        aria-label="Minimize window"
      >
        <Minus className="size-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-md"
        onClick={onToggleMaximize}
        aria-label="Maximize or restore window"
      >
        <Square className="size-3.5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-md hover:bg-destructive/15 hover:text-destructive"
        onClick={onClose}
        aria-label="Close window"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
