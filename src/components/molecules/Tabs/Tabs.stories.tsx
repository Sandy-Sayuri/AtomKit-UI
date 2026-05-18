import type { Meta, StoryObj } from "@storybook/react";
import { FiBox, FiPieChart, FiSettings } from "react-icons/fi";
import { Tabs } from "./Tabs";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    items: [
      { id: "components", icon: <FiBox />, label: "Componentes", content: "Biblioteca Atomic Design." },
      { id: "themes", icon: <FiSettings />, label: "Temas", content: "Design tokens e provider." },
      { id: "charts", icon: <FiPieChart />, label: "Charts", content: "Graficos SVG autorais." },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
