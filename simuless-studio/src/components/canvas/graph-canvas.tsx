import { useCallback, useRef, useState } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";
import { useStudioStore } from "@/store/studio-store";
import CustomNode from "./nodes/custom-node";
import ScopeNode from "./nodes/scope-node";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
  scope: ScopeNode,
};

interface InnerCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: OnConnect;
  onNodeClick: (e: React.MouseEvent, node: Node) => void;
  onAddNode: (node: Node) => void;
}

// Inner component that handles the ReactFlow rendering
function InnerCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onAddNode,
}: InnerCanvasProps) {
  const reactFlowWrapperRef = useRef<HTMLDivElement>(null);
  const [dragOffset] = useState({ x: 0, y: 0 });

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("nodeType");
      if (!nodeType) return;

      if (!reactFlowWrapperRef.current) return;

      const bounds = reactFlowWrapperRef.current.getBoundingClientRect();

      // Simple position calculation relative to the canvas wrapper
      // This is a basic calculation without considering zoom/pan
      const x = event.clientX - bounds.left - 50;
      const y = event.clientY - bounds.top - 25;

      const nodeId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const isScope = nodeType === "scope";
      const nodeTypeVal = isScope ? "scope" : "custom";

      const newNode: Node = {
        id: nodeId,
        type: nodeTypeVal,
        position: { x: Math.max(0, x), y: Math.max(0, y) },
        data: {
          label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
          ...(isScope && { dataX: [], dataY: [] }),
        },
      };

      onAddNode(newNode);
    },
    [onAddNode]
  );

  return (
    <div
      ref={reactFlowWrapperRef}
      className="w-full h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Panel position="top-left" className="bg-card p-2 rounded border border-border text-xs text-muted-foreground">
          Drag nodes from left panel
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default function GraphCanvas() {
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

  const handleAddNode = useCallback(
    (newNode: Node) => {
      setNodes((nds) => [...nds, newNode]);
      addNode({
        id: newNode.id,
        type: newNode.type || "custom",
        position: newNode.position,
        data: newNode.data,
      } as any);
    },
    [setNodes, addNode]
  );

  return (
    <div className="w-full h-full bg-background">
      <InnerCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onAddNode={handleAddNode}
      />
    </div>
  );
}
