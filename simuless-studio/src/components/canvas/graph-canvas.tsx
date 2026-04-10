import { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  OnConnect,
  Node,
  Edge,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { useStudioStore } from "@/store/studio-store";
import CustomNode from "./nodes/custom-node";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

function GraphCanvasContent() {
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
      type: "custom",
    })) as Node[]
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edges_store as Edge[]
  );

  const reactFlowRef = useRef<HTMLDivElement>(null);

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
      const newEdge = {
        id: `e${connection.source}-${connection.target}`,
        source: connection.source || "",
        target: connection.target || "",
      };
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

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowRef.current) return;

      const nodeType = event.dataTransfer.getData("nodeType");
      if (!nodeType) return;

      const bounds = reactFlowRef.current.getBoundingClientRect();
      
      // Simple position calculation without useReactFlow
      const x = event.clientX - bounds.left - 50;
      const y = event.clientY - bounds.top - 25;
      const position = { x, y };

      const nodeId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newNode = {
        id: nodeId,
        type: "custom",
        position,
        data: { label: nodeType },
      };

      setNodes((nds) => [...nds, newNode]);
      addNode({
        id: nodeId,
        type: "custom",
        position,
        data: { label: nodeType },
      } as any);

      syncToStore();
    },
    [setNodes, addNode, syncToStore]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      selectNode(node.id);
    },
    [selectNode]
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
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

export default function GraphCanvas() {
  const reactFlowRef = useRef<HTMLDivElement>(null);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowRef}
      className="w-full h-full bg-background"
      onDragOver={handleDragOver}
    >
      <GraphCanvasContent />
    </div>
  );
}
