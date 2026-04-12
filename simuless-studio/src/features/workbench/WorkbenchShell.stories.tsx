import type { Meta, StoryObj } from "@storybook/react-vite"

import WorkbenchShell from "@/features/workbench/WorkbenchShell"

const meta = {
  title: "Workbench/WorkbenchShell",
  component: WorkbenchShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WorkbenchShell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
