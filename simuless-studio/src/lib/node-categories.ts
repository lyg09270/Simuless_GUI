import {
  Volume2,
  Plus,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  GitBranch,
  CircleDot,
  RadioTower,
  Gauge,
  Waves,
  Sigma,
  LineChart,
  Divide,
  Layers,
  Activity,
  Filter,
  Lock,
  Database,
  Save,
  GitMerge,
  Sliders,
  Settings2,
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
  icon: React.ComponentType<any>;
}

export const nodeCategories: NodeCategory[] = [
  {
    id: "sources",
    name: "Sources",
    label: "sources.title",
    icon: CircleDot,
    children: [
      { id: "input", label: "Input", description: "Input signal", icon: RadioTower },
      { id: "constant", label: "Constant", description: "Constant value", icon: Gauge },
      { id: "ramp", label: "Ramp", description: "Ramp signal", icon: TrendingUp },
      { id: "sine", label: "Sine Wave", description: "Sine wave generator", icon: Waves },
    ],
  },
  {
    id: "math",
    name: "Math Operations",
    label: "math.title",
    icon: Plus,
    children: [
      { id: "sum", label: "Sum", description: "Add or subtract signals", icon: Sigma },
      { id: "gain", label: "Gain", description: "Multiply by constant", icon: Volume2 },
      {
        id: "product",
        label: "Product",
        description: "Multiply signals",
        icon: Zap,
      },
      { id: "divide", label: "Divide", description: "Divide signals", icon: Divide },
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
        icon: LineChart,
      },
      {
        id: "differentiator",
        label: "Differentiator",
        description: "Differentiate signal",
        icon: TrendingDown,
      },
      {
        id: "transfer-fn",
        label: "Transfer Function",
        description: "Linear transfer function",
        icon: Activity,
      },
      { id: "state-space", label: "State-Space", description: "State-space model", icon: Layers },
    ],
  },
  {
    id: "signal-routing",
    name: "Signal Routing",
    label: "routing.title",
    icon: GitBranch,
    children: [
      { id: "mux", label: "Mux", description: "Multiplex signals", icon: GitMerge },
      { id: "demux", label: "Demux", description: "Demultiplex signals", icon: Layers },
      { id: "selector", label: "Selector", description: "Select signal elements", icon: Sliders },
    ],
  },
  {
    id: "sinks",
    name: "Sinks",
    label: "sinks.title",
    icon: BarChart3,
    children: [
      { id: "scope", label: "Scope", description: "Oscilloscope display", icon: BarChart3 },
      { id: "output", label: "Output", description: "Output signal", icon: RadioTower },
      { id: "display", label: "Display", description: "Display numeric value", icon: Volume2 },
      { id: "to-file", label: "To File", description: "Write to file", icon: Save },
    ],
  },
  {
    id: "control",
    name: "Control Systems",
    label: "control.title",
    icon: Zap,
    children: [
      { id: "pid", label: "PID Controller", description: "PID control loop", icon: Settings2 },
      { id: "filter", label: "Low-Pass Filter", description: "Filter signal", icon: Filter },
      { id: "limiter", label: "Saturation", description: "Limit signal range", icon: Lock },
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
