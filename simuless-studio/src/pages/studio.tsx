import TopBar from "@/components/layout/top-bar";
import NodePanel from "@/components/layout/node-panel";
import PropertyPanel from "@/components/layout/property-panel";
import BottomConsole from "@/components/layout/bottom-console";
import UnifiedCanvas from "@/components/canvas/unified-canvas";

export default function StudioPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <NodePanel />

        <div className="flex-1">
          <UnifiedCanvas />
        </div>

        <PropertyPanel />
      </div>

      <BottomConsole />
    </div>
  );
}
