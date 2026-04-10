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

      const reactFlowWrapper = (event.currentTarget as HTMLDivElement)?.querySelector(
        ".react-flow__viewport"
      );
      if (!reactFlowWrapper) return;

      const reactFlowBounds = reactFlowWrapper.getBoundingClientRect();
      
      // Calculate position relative to the canvas viewport
      const x = event.clientX - reactFlowBounds.left;
      const y = event.clientY - reactFlowBounds.top;

      // The position needs to be transformed based on zoom/pan
      // For now, use a simple calculation
      const position = {
        x: x - 50,
        y: y - 25,
      };

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
    [setNodes, addNode]
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
      <Controls />
      <MiniMap />
      <Panel position="top-left" className="bg-card p-2 rounded border border-border">
        <div className="text-xs text-muted-foreground">
          Drag nodes from the left panel to create
        </div>
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
