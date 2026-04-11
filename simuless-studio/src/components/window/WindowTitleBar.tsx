import type { ReactNode } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

import WindowControls from "@/components/window/WindowControls";
import { cn } from "@/lib/utils";

type WindowTitleBarProps = {
  title: string;
  leftSlot?: ReactNode;
  className?: string;
};

export default function WindowTitleBar({
  title,
  leftSlot,
  className,
}: WindowTitleBarProps) {
  const onStartDragging = async () => {
    try {
      await getCurrentWindow().startDragging();
    } catch {
      // no-op outside Tauri runtime
    }
  };

  return (
    <header className={cn("h-10 border-b flex items-center select-none", className)}>
      <div className="px-3 font-semibold shrink-0">{title}</div>

      {leftSlot ? (
        <div className="flex items-center gap-2" data-no-drag>
          {leftSlot}
        </div>
      ) : null}

      <div className="flex-1 h-full" onMouseDown={() => void onStartDragging()} />

      <WindowControls />
    </header>
  );
}
