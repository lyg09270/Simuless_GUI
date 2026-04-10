import type { FileItem } from "@/types/graph";

export const generateMockFileTree = (basePath: string): FileItem[] => {
  return [
    {
      name: "src",
      path: `${basePath}/src`,
      type: "directory",
      children: [
        {
          name: "main.py",
          path: `${basePath}/src/main.py`,
          type: "file",
        },
        {
          name: "simulator.py",
          path: `${basePath}/src/simulator.py`,
          type: "file",
        },
        {
          name: "models",
          path: `${basePath}/src/models`,
          type: "directory",
          children: [
            {
              name: "controller.py",
              path: `${basePath}/src/models/controller.py`,
              type: "file",
            },
            {
              name: "system.py",
              path: `${basePath}/src/models/system.py`,
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "config",
      path: `${basePath}/config`,
      type: "directory",
      children: [
        {
          name: "settings.json",
          path: `${basePath}/config/settings.json`,
          type: "file",
        },
        {
          name: "simulation.yaml",
          path: `${basePath}/config/simulation.yaml`,
          type: "file",
        },
      ],
    },
    {
      name: "README.md",
      path: `${basePath}/README.md`,
      type: "file",
    },
    {
      name: "requirements.txt",
      path: `${basePath}/requirements.txt`,
      type: "file",
    },
  ];
};

export const getMockFileContent = (filePath: string): string => {
  const fileMap: Record<string, string> = {
    "/workspace/src/main.py": `#!/usr/bin/env python3
"""
Main simulation entry point
"""

from simulator import Simulator
from config.settings import load_config

def main():
    config = load_config()
    simulator = Simulator(config)
    simulator.run()

if __name__ == "__main__":
    main()
`,
    "/workspace/src/simulator.py": `"""
Core simulation engine
"""

class Simulator:
    def __init__(self, config):
        self.config = config
        self.nodes = []
        self.edges = []
    
    def add_node(self, node):
        self.nodes.append(node)
    
    def run(self):
        """Execute simulation"""
        pass
`,
    "/workspace/src/models/controller.py": `"""
Control system models
"""

class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki
        self.kd = kd
    
    def update(self, error):
        return self.kp * error
`,
    "/workspace/src/models/system.py": `"""
System dynamics models
"""

class LinearSystem:
    def __init__(self, A, B, C, D):
        self.A = A
        self.B = B
        self.C = C
        self.D = D
`,
    "/workspace/config/settings.json": `{
  "simulation": {
    "dt": 0.01,
    "duration": 10.0,
    "solver": "rk45"
  },
  "logging": {
    "level": "INFO",
    "file": "simulation.log"
  }
}
`,
    "/workspace/config/simulation.yaml": `simulation:
  dt: 0.01
  duration: 10.0
  solver: rk45

logging:
  level: INFO
  file: simulation.log
`,
    "/workspace/README.md": `# Simuless Studio

Control Systems Simulation Environment

## Features
- Node-based flow graph editor
- Python code integration
- Real-time visualization

## Getting Started
1. Install dependencies
2. Run \`python src/main.py\`
`,
    "/workspace/requirements.txt": `numpy>=1.20.0
scipy>=1.7.0
matplotlib>=3.4.0
plotly>=5.0.0
`,
  };

  return fileMap[filePath] || "// File content not available";
};
