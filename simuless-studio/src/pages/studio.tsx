import TopBar from "@/components/layout/top-bar";
import NodePanel from "@/components/layout/node-panel";
import PropertyPanel from "@/components/layout/property-panel";
import BottomConsole from "@/components/layout/bottom-console";
import GraphCanvas from "@/components/canvas/graph-canvas";

export default function StudioPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <NodePanel />

        <div className="flex-1">
          <GraphCanvas />
        </div>

        <PropertyPanel />
      </div>

      <BottomConsole />
    </div>
  );
}