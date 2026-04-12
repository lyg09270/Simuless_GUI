import type { Decorator } from "@storybook/react-vite"

import { AppThemeProvider } from "@/app/theme/AppThemeProvider"

export const withAppTheme: Decorator = (Story) => {
  return (
    <AppThemeProvider>
      <div className="h-screen w-screen">
        <Story />
      </div>
    </AppThemeProvider>
  )
}
