import { create } from "zustand";

export interface ConsoleMessage {
  id: string;
  type: "log" | "error" | "warn" | "success" | "info";
  message: string;
  timestamp: Date;
}

interface CLIStore {
  messages: ConsoleMessage[];
  addMessage: (type: ConsoleMessage["type"], message: string) => void;
  clear: () => void;
  execute: (command: string) => Promise<void>;
}

export const useCLI = create<CLIStore>((set, get) => ({
  messages: [],

  addMessage: (type, message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `msg-${Date.now()}-${Math.random()}`,
          type,
          message,
          timestamp: new Date(),
        },
      ],
    }));
  },

  clear: () => {
    set({ messages: [] });
  },

  execute: async (command: string) => {
    const { addMessage } = get();
    const trimmed = command.trim();

    if (!trimmed) return;

    // Log the command
    addMessage("info", `$ ${trimmed}`);

    // Parse and execute command
    const args = trimmed.split(" ");
    const cmd = args[0];

    try {
      switch (cmd) {
        case "help":
          addMessage(
            "info",
            "Available commands: help, clear, run, build, info, save"
          );
          break;

        case "clear":
          get().clear();
          break;

        case "run":
          addMessage("info", "Starting simulation...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          addMessage("success", "Simulation completed successfully");
          break;

        case "build":
          addMessage("info", "Building project...");
          await new Promise((resolve) => setTimeout(resolve, 1500));
          addMessage("success", "Build completed");
          break;

        case "info":
          addMessage(
            "info",
            "Simuless Studio - Control Systems Simulation Editor"
          );
          addMessage(
            "info",
            `Nodes: ${args[1] || "N/A"} | Mode: Graph Editor`
          );
          break;

        case "save":
          addMessage("info", "Saving project...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          addMessage("success", "Project saved");
          break;

        case "echo":
          addMessage("log", args.slice(1).join(" "));
          break;

        default:
          addMessage(
            "error",
            `Unknown command: ${cmd}. Type 'help' for available commands.`
          );
      }
    } catch (error) {
      addMessage("error", `Error executing command: ${String(error)}`);
    }
  },
}));
