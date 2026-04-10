import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type WindowType = "scope" | "plot" | "inspector" | "custom";

export interface WindowConfig {
  id: string;
  type: WindowType;
  title: string;
  width?: number;
  height?: number;
  data?: any;
  position?: { x: number; y: number };
}

interface WindowStore {
  windows: Map<string, WindowConfig>;
  openWindow: (config: WindowConfig) => void;
  closeWindow: (windowId: string) => void;
  updateWindowData: (windowId: string, data: any) => void;
  getWindow: (windowId: string) => WindowConfig | undefined;
  getAllWindows: () => WindowConfig[];
}

export const useWindowStore = create<WindowStore>()(
  devtools(
    (set, get) => ({
      windows: new Map(),

      openWindow: (config) => {
        set((state) => {
          const newWindows = new Map(state.windows);
          newWindows.set(config.id, config);
          return { windows: newWindows };
        });
      },

      closeWindow: (windowId) => {
        set((state) => {
          const newWindows = new Map(state.windows);
          newWindows.delete(windowId);
          return { windows: newWindows };
        });
      },

      updateWindowData: (windowId, data) => {
        set((state) => {
          const newWindows = new Map(state.windows);
          const window = newWindows.get(windowId);
          if (window) {
            window.data = { ...window.data, ...data };
          }
          return { windows: newWindows };
        });
      },

      getWindow: (windowId) => {
        return get().windows.get(windowId);
      },

      getAllWindows: () => {
        return Array.from(get().windows.values());
      },
    }),
    {
      name: "WindowStore",
    }
  )
);

/**
 * Open a window using HTML5 window.open API
 * This is compatible with any environment (browser, Electron, Tauri)
 */
export const openExternalWindow = (config: WindowConfig): Window | null => {
  const { width = 1000, height = 700, title, data } = config;

  // Create window with specified dimensions
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const windowFeatures = `
    width=${width},
    height=${height},
    left=${left},
    top=${top},
    resizable=yes,
    scrollbars=yes
  `.trim();

  // Get the base URL for opening window.html
  const windowUrl = `${window.location.origin}/window.html`;
  const newWindow = window.open(windowUrl, `window-${config.id}`, windowFeatures);

  if (newWindow) {
    // Store window reference for later communication
    useWindowStore.getState().openWindow(config);

    // Pass data via postMessage with delay to ensure window is ready
    const sendData = () => {
      try {
        newWindow.postMessage(
          { type: "WINDOW_INIT", config, data },
          "*"
        );
      } catch (error) {
        console.error("Failed to send data to window:", error);
      }
    };

    // Send data after a small delay to ensure window is ready
    setTimeout(sendData, 500);
  }

  return newWindow;
};

/**
 * Close a window managed by this system
 */
export const closeExternalWindow = (windowId: string) => {
  useWindowStore.getState().closeWindow(windowId);
};

/**
 * Update data in a window
 */
export const updateWindowData = (windowId: string, data: any) => {
  useWindowStore.getState().updateWindowData(windowId, data);
};

/**
 * Send message to all windows of a specific type
 */
export const sendMessageToWindows = (
  windowType: WindowType,
  message: any
) => {
  const windows = useWindowStore.getState().getAllWindows();
  windows.forEach((windowConfig) => {
    if (windowConfig.type === windowType) {
      try {
        // Try to find the window and send message
        const childWindow = globalThis.open("", `window-${windowConfig.id}`) as any;
        if (childWindow && !childWindow.closed) {
          childWindow.postMessage(message, "*");
        }
      } catch (error) {
        console.error(`Failed to send message to window ${windowConfig.id}:`, error);
      }
    }
  });
};

/**
 * Store window references for communication
 */
const windowReferences = new Map<string, Window>();

export const registerWindow = (windowId: string, windowRef: Window) => {
  windowReferences.set(windowId, windowRef);
};

export const getWindowReference = (windowId: string): Window | undefined => {
  return windowReferences.get(windowId);
};
