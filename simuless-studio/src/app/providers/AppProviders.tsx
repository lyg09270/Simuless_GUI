import type { PropsWithChildren } from "react"

import { AppThemeProvider } from "@/app/theme/AppThemeProvider"

export function AppProviders({ children }: PropsWithChildren) {
  return <AppThemeProvider>{children}</AppThemeProvider>
}
