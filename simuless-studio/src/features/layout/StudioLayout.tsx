import { Button } from "@/components/ui/button";
import WindowTitleBar from "@/components/window/WindowTitleBar";
import FlowCanvas from "@/features/flow/FlowCanvas";
import ConsolePanel from "@/features/panels/ConsolePanel";
import NodeLibraryPanel from "@/features/panels/NodeLibraryPanel";
import PropertyPanel from "@/features/panels/PropertyPanel";

export default function StudioLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <WindowTitleBar
        title="SimuLess Studio"
        leftSlot={
          <>
        <Button size="sm">Run</Button>
        <Button size="sm" variant="outline">
          Stop
        </Button>
          </>
        }
      />

      {/* 主工作区 */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* 左侧栏 */}
        <NodeLibraryPanel />

        {/* 中间画布 */}
        <div className="flex-1 min-h-0">
          <FlowCanvas />
        </div>

        {/* 右侧属性 */}
        <PropertyPanel />
      </div>

      {/* 底部控制台 */}
      <ConsolePanel />
    </div>
  );
}
