import { Check, Monitor, MoonStar, SunMedium } from "lucide-react"

import { Button } from "@/components/ui/button"
import { THEME_OPTIONS } from "@/app/theme/types"
import { useThemeController } from "@/app/theme/useThemeController"

const iconByTheme = {
  light: SunMedium,
  dark: MoonStar,
  system: Monitor,
} as const

export function ThemeSettingsPanel() {
  const { theme, resolvedTheme, setTheme } = useThemeController()

  return (
    <div className="space-y-4 p-3">
      <section className="rounded-lg border border-border bg-background/70">
        <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Theme Mode
        </div>

        <div className="space-y-2 p-3">
          {THEME_OPTIONS.map((option) => {
            const Icon = iconByTheme[option.id]
            const active = theme === option.id

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setTheme(option.id)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-4" />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </div>

                {active ? <Check className="size-4 text-primary" /> : null}
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background/70 p-3 text-sm">
        <div className="mb-2 font-medium">Resolved theme</div>
        <div className="text-muted-foreground">
          Current effective palette: <span className="font-medium text-foreground">{resolvedTheme}</span>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-background/70 p-3">
        <div className="mb-2 text-sm font-medium">Future extension surface</div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div>Theme provider is centralized and shared by app + Storybook.</div>
          <div>Workbench components consume semantic tokens instead of hard-coded colors.</div>
        </div>

        <div className="mt-3">
          <Button size="sm" variant="outline" disabled>
            Add product themes later
          </Button>
        </div>
      </section>
    </div>
  )
}
