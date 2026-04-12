import type { Preview } from "@storybook/react-vite"

import "@/App.css"
import { withAppTheme } from "@/app/storybook/withAppTheme"

const preview: Preview = {
  decorators: [withAppTheme],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
