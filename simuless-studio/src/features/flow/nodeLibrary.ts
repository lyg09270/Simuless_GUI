export const nodeLibrary = [
  {
    category: "Sources",
    nodes: [
      { type: "input", label: "Input" },
      { type: "constant", label: "Constant" },
    ],
  },
  {
    category: "Math",
    nodes: [
      { type: "gain", label: "Gain" },
      { type: "add", label: "Add" },
      { type: "multiply", label: "Multiply" },
    ],
  },
  {
    category: "Control",
    nodes: [
      { type: "pid", label: "PID" },
      { type: "integrator", label: "Integrator" },
    ],
  },
  {
    category: "Visualization",
    nodes: [
      { type: "scope", label: "Scope" },
      { type: "logger", label: "Logger" },
    ],
  },
]
