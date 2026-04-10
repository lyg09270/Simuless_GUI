import {
  Volume2,
  Plus,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  GitBranch,
  CircleDot,
} from "lucide-react";

export interface NodeCategory {
  id: string;
  name: string;
  label: string;
  icon: React.ComponentType<any>;
  children?: NodeItem[];
}

export interface NodeItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<any>;
}

export const nodeCategories: NodeCategory[] = [
  {
    id: "sources",
    name: "Sources",
    label: "sources.title",
    icon: CircleDot,
    children: [
      { id: "input", label: "Input", description: "Input signal" },
      { id: "constant", label: "Constant", description: "Constant value" },
      { id: "ramp", label: "Ramp", description: "Ramp signal" },
      { id: "sine", label: "Sine Wave", description: "Sine wave generator" },
    ],
  },
  {
    id: "math",
    name: "Math Operations",
    label: "math.title",
    icon: Plus,
    children: [
      { id: "sum", label: "Sum", description: "Add or subtract signals" },
      { id: "gain", label: "Gain", description: "Multiply by constant" },
      {
        id: "product",
        label: "Product",
        description: "Multiply signals",
      },
      { id: "divide", label: "Divide", description: "Divide signals" },
    ],
  },
  {
    id: "dynamical",
    name: "Dynamical Systems",
    label: "dynamical.title",
    icon: TrendingUp,
    children: [
      {
        id: "integrator",
        label: "Integrator",
        description: "Integrate signal",
      },
      {
        id: "differentiator",
        label: "Differentiator",
        description: "Differentiate signal",
      },
      {
        id: "transfer-fn",
        label: "Transfer Function",
        description: "Linear transfer function",
      },
      { id: "state-space", label: "State-Space", description: "State-space model" },
    ],
  },
  {
    id: "signal-routing",
    name: "Signal Routing",
    label: "routing.title",
    icon: GitBranch,
    children: [
      { id: "mux", label: "Mux", description: "Multiplex signals" },
      { id: "demux", label: "Demux", description: "Demultiplex signals" },
      { id: "selector", label: "Selector", description: "Select signal elements" },
    ],
  },
  {
    id: "sinks",
    name: "Sinks",
    label: "sinks.title",
    icon: BarChart3,
    children: [
      { id: "scope", label: "Scope", description: "Oscilloscope display" },
      { id: "output", label: "Output", description: "Output signal" },
      { id: "display", label: "Display", description: "Display numeric value" },
      { id: "to-file", label: "To File", description: "Write to file" },
    ],
  },
  {
    id: "control",
    name: "Control Systems",
    label: "control.title",
    icon: Zap,
    children: [
      { id: "pid", label: "PID Controller", description: "PID control loop" },
      { id: "filter", label: "Low-Pass Filter", description: "Filter signal" },
      { id: "limiter", label: "Saturation", description: "Limit signal range" },
    ],
  },
];

export const getNodeIcon = (nodeId: string): React.ComponentType<any> | undefined => {
  for (const category of nodeCategories) {
    const item = category.children?.find((c) => c.id === nodeId);
    if (item) {
      return item.icon;
    }
  }
  return undefined;
};

export const getNodeLabel = (nodeId: string): string => {
  for (const category of nodeCategories) {
    const item = category.children?.find((c) => c.id === nodeId);
    if (item) {
      return item.label;
    }
  }
  return nodeId;
};
