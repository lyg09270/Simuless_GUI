import { useTheme } from "next-themes"

import type { AppTheme, ThemeController } from "@/app/theme/types"

export function useThemeController(): ThemeController {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return {
    theme: (theme as AppTheme | undefined) ?? "system",
    resolvedTheme: resolvedTheme === "dark" ? "dark" : "light",
    setTheme: (nextTheme) => setTheme(nextTheme),
  }
}
