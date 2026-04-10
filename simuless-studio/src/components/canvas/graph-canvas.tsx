import { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  OnConnect,
  Node,
  Edge,
  NodeTypes,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useStudioStore } from "@/store/studio-store";
import CustomNode from "./nodes/custom-node";
import ScopeNode from "./nodes/scope-node";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
  scope: ScopeNode,
};

function GraphCanvasContent() {
  const { screenToFlowPosition } = useReactFlow();

  const nodes_store = useStudioStore((state) => state.nodes);
  const edges_store = useStudioStore((state) => state.edges);
  const setStoreNodes = useStudioStore((state) => state.setNodes);
  const setStoreEdges = useStudioStore((state) => state.setEdges);
  const addNode = useStudioStore((state) => state.addNode);
  const selectNode = useStudioStore((state) => state.selectNode);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodes_store.map((n) => ({
      id: n.id,
      position: n.position,
      data: n.data,
      type: n.type === "scope" ? "scope" : "custom",
    })) as Node[]
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edges_store as Edge[]
  );

  // Sync local state to store
  const syncToStore = useCallback(() => {
    const updatedNodes = nodes.map((n) => ({
      id: n.id,
      type: n.type || "custom",
      position: n.position,
      data: n.data || { label: "" },
    }));
    setStoreNodes(updatedNodes as any);
    setStoreEdges(edges as any);
  }, [nodes, edges, setStoreNodes, setStoreEdges]);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      syncToStore();
    },
    [setEdges, syncToStore]
  );

  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      syncToStore();
    },
    [onNodesChange, syncToStore]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      syncToStore();
    },
    [onEdgesChange, syncToStore]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("nodeType");
      if (!nodeType) return;

      // Use React Flow's screenToFlowPosition to get the correct position
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const isScope = nodeType === "scope";
      const nodeTypeVal = isScope ? "scope" : "custom";

      const newNode: Node = {
        id: nodeId,
        type: nodeTypeVal,
        position,
        data: {
          label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
          ...(isScope && { dataX: [], dataY: [] }),
        },
      };

      setNodes((nds) => [...nds, newNode]);
      addNode({
        id: nodeId,
        type: nodeTypeVal,
        position,
        data: newNode.data,
      } as any);
    },
    [setNodes, addNode, screenToFlowPosition]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={onConnect}
      onNodeClick={handleNodeClick}
      nodeTypes={nodeTypes}
      fitView
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Background />
      <Panel position="top-left" className="bg-card p-2 rounded border border-border text-xs text-muted-foreground">
        Drag nodes from left panel
      </Panel>
    </ReactFlow>
  );
}

export default function GraphCanvas() {
  return (
    <div className="w-full h-full bg-background">
      <GraphCanvasContent />
    </div>
  );
}
