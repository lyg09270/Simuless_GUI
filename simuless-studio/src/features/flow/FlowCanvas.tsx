import { useCallback, useRef, useState } from "react"
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type OnConnect,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import { useThemeController } from "@/app/theme/useThemeController"
import BaseNode from "@/features/flow/nodes/BaseNode"

const nodeTypes = {
  base: BaseNode,
}

const initialNodes: Node[] = [
  {
    id: "seed-input",
    type: "base",
    position: { x: 120, y: 120 },
    data: { label: "Input" },
  },
  {
    id: "seed-scope",
    type: "base",
    position: { x: 420, y: 180 },
    data: { label: "Scope" },
  },
]

const initialEdges: Edge[] = [
  {
    id: "seed-edge",
    source: "seed-input",
    target: "seed-scope",
  },
]

let nextId = 1

function createNodeId() {
  nextId += 1
  return `node-${nextId}`
}

function FlowCanvasInner() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [clipboard, setClipboard] = useState<Node[]>([])
  const { resolvedTheme } = useThemeController()
  const { screenToFlowPosition } = useReactFlow()

  const onConnect = useCallback<OnConnect>(
    (connection) => {
      setEdges((current) => addEdge(connection, current))
    },
    [setEdges]
  )

  const focusCanvas = () => {
    wrapperRef.current?.focus()
  }

  const removeSelectedNodes = useCallback(() => {
    const selectedIds = new Set(nodes.filter((node) => node.selected).map((node) => node.id))

    if (selectedIds.size === 0) {
      return
    }

    setNodes((current) => current.filter((node) => !selectedIds.has(node.id)))
    setEdges((current) =>
      current.filter((edge) => !selectedIds.has(edge.source) && !selectedIds.has(edge.target))
    )
  }, [nodes, setEdges, setNodes])

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      focusCanvas()

      const raw = event.dataTransfer.getData("application/reactflow")
      if (!raw) {
        return
      }

      const payload = JSON.parse(raw) as { label?: string; type?: string; nodeType?: string }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const nextNode: Node = {
        id: createNodeId(),
        type: payload.type ?? "base",
        position,
        data: {
          label: payload.label ?? "Untitled Node",
          nodeType: payload.nodeType ?? "base",
        },
        selected: true,
      }

      setNodes((current) => {
        const clearedNodes: Node[] = current.map((node) => ({ ...node, selected: false }))
        return [...clearedNodes, nextNode]
      })
    },
    [screenToFlowPosition, setNodes]
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const isModifier = event.metaKey || event.ctrlKey
      const selectedNodes = nodes.filter((node) => node.selected)

      if (isModifier && event.key.toLowerCase() === "c" && selectedNodes.length > 0) {
        event.preventDefault()
        setClipboard(
          selectedNodes.map((node) => ({
            ...node,
            selected: false,
            position: { ...node.position },
          }))
        )
        return
      }

      if (isModifier && event.key.toLowerCase() === "v" && clipboard.length > 0) {
        event.preventDefault()

        setNodes((current) => {
          const resetSelection = current.map((node) => ({ ...node, selected: false }))
          const pastedNodes = clipboard.map((node, index) => ({
            ...node,
            id: createNodeId(),
            position: {
              x: node.position.x + 36 + index * 12,
              y: node.position.y + 36 + index * 12,
            },
            selected: true,
          }))

          return resetSelection.concat(pastedNodes)
        })
        return
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        const tagName = (event.target as HTMLElement).tagName
        if (tagName === "INPUT" || tagName === "TEXTAREA") {
          return
        }

        event.preventDefault()
        removeSelectedNodes()
      }
    },
    [clipboard, nodes, removeSelectedNodes, setNodes]
  )

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onKeyDown={onKeyDown}
      onPointerDown={focusCanvas}
      className="relative h-full w-full outline-none"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
      >
        <MiniMap pannable zoomable className="!bg-background/80" maskColor="transparent" />
        <Background gap={20} size={1} />
        <Controls className="!bg-card" />
      </ReactFlow>

      <div className="pointer-events-none absolute right-3 top-3 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
        Drag from Nodes panel. Use Ctrl/Cmd+C, Ctrl/Cmd+V, Delete inside the canvas.
      </div>
    </div>
  )
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  )
}
