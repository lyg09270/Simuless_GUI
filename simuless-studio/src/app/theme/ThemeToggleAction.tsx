import { Monitor, MoonStar, SunMedium } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useThemeController } from "@/app/theme/useThemeController"

const cycleOrder = ["light", "dark", "system"] as const

export function ThemeToggleAction() {
  const { theme, setTheme } = useThemeController()

  const onCycleTheme = () => {
    const currentIndex = cycleOrder.indexOf(theme)
    const nextTheme = cycleOrder[(currentIndex + 1) % cycleOrder.length]
    setTheme(nextTheme)
  }

  const Icon = theme === "light" ? SunMedium : theme === "dark" ? MoonStar : Monitor

  return (
    <Button type="button" variant="ghost" size="sm" onClick={onCycleTheme}>
      <Icon className="size-4" />
      Theme
    </Button>
  )
}
