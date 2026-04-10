import { useEffect } from "react";
import StudioPage from "./pages/studio";
import { useStudioStore } from "@/store/studio-store";
import { applyTheme, getSystemTheme } from "@/lib/theme";

export default function App() {
  const theme = useStudioStore((state) => state.theme);
  const setTheme = useStudioStore((state) => state.setTheme);

  // Initialize theme on mount
  useEffect(() => {
    const storedData = localStorage.getItem("studio-store");
    if (!storedData) {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      applyTheme(systemTheme);
    } else {
      try {
        const parsed = JSON.parse(storedData);
        const savedTheme = parsed.state?.theme;
        if (savedTheme) {
          applyTheme(savedTheme);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [setTheme]);

  // Apply theme changes when theme state updates
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <StudioPage />;
}
