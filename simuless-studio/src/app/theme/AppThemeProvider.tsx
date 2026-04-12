import type { PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="simuless-theme"
    >
      {children}
    </ThemeProvider>
  )
}
