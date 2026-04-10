import { useStudioStore } from "@/store/studio-store";
import GraphCanvas from "./graph-canvas";
import CodeEditor from "@/components/editor/code-editor";

export default function UnifiedCanvas() {
  const mode = useStudioStore((state) => state.mode);

  return (
    <div className="w-full h-full overflow-hidden">
      {mode === "graph" ? <GraphCanvas /> : <CodeEditor />}
    </div>
  );
}
