import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (storybookConfig) => {
    storybookConfig.resolve ??= {}
    storybookConfig.resolve.alias = {
      ...(storybookConfig.resolve.alias ?? {}),
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    }

    return storybookConfig
  },
}

export default config
