import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 200, y: 120 },
    data: { label: "Gain" },
    type: "default",
  },
  {
    id: "2",
    position: { x: 500, y: 120 },
    data: { label: "Integrator" },
    type: "default",
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

export default function GraphCanvas() {
  return (
    <div className="h-full w-full">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}