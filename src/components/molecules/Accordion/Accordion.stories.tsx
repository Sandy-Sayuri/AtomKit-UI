import type { Meta, StoryObj } from "@storybook/react";
import { FiLayers, FiSettings } from "react-icons/fi";
import { Accordion } from "./Accordion";

const meta = {
  title: "Molecules/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    items: [
      { id: "tokens", icon: <FiSettings />, title: "Tokens", content: "Cores, radius, sombras e densidade." },
      { id: "layers", icon: <FiLayers />, title: "Atomic Design", content: "Atoms, molecules e organisms." },
    ],
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
