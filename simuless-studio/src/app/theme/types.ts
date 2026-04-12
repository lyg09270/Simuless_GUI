export type AppTheme = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

export interface ThemeController {
  theme: AppTheme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: AppTheme) => void
}

export interface ThemeOption {
  id: AppTheme
  label: string
  description: string
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "light",
    label: "Light",
    description: "Bright workspace with neutral panels.",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Low-glare workspace tuned for long sessions.",
  },
  {
    id: "system",
    label: "System",
    description: "Follow the operating system appearance.",
  },
]
